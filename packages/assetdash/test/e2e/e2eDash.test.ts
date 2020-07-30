import {expect} from 'chai';
import {formatISO} from 'date-fns';
import nock from 'nock';
import {PricingDataUpdater} from '../../src/app/PricingDataUpdater';
import {DashService} from '../../src/core/DashService';
import {Asset} from '../../src/core/models/asset';
import {parseAsEstDate} from '../../src/core/utils';
import {AssetRepository} from '../../src/integration/db/repositories/AssetRepository';
import {RanksRepository} from '../../src/integration/db/repositories/RanksRepository';
import {CoinmarketCapService} from '../../src/integration/http/CoinmarketCapService';
import {IexCloudService} from '../../src/integration/http/IexCloudService';
import {clearDatabase} from '../helpers/clear-db';
import {createTestServices} from '../helpers/createTestServices';
import {anAsset, cryptoAssetData, stockAssetData} from '../helpers/fixtures';

const updater = (iexCloudService: IexCloudService,
  coinmarketCapService: CoinmarketCapService,
  assetRepository: AssetRepository,
  ranksRepository: RanksRepository,
  dashService: DashService) => async (date: string) => {
  const pricingDataUpdater = new PricingDataUpdater(iexCloudService, coinmarketCapService, assetRepository, ranksRepository, dashService);
  await pricingDataUpdater.updateCryptoAssetPrices(await assetRepository.getTickers('Cryptocurrency'));
  const stockAndETFTickers = (await assetRepository.getTickers('Stock')).concat(await assetRepository.getTickers('ETF'));
  await pricingDataUpdater.updateStocksAndETFsAssetPrices(stockAndETFTickers);
  await pricingDataUpdater.updateRanksForAssets();
  await pricingDataUpdater.updateDash(parseAsEstDate(date));
};

async function iexWillReturn(ticker: string, iexResponse: any) {
  nock(/iexcloud\.test/)
    .get(new RegExp(ticker))
    .reply(200, {
      ticker: iexResponse
    });
}

async function coinmarketcapWillReturn(ticker: string, coinmarketcapResponse: any) {
  nock(/coinmarketcap\.test/)
    .get(new RegExp(ticker))
    .reply(200, {
      data: {
        ticker: coinmarketcapResponse
      }
    });
}

function stock(
  {
    latestUpdate = '2020-01-01',
    marketCap = 1652987245800,
    symbol = 'AAPL'
  } = {}
) {
  const latestUpdateTimestamp = parseAsEstDate(latestUpdate).getTime();
  return {quote: {...stockAssetData.quote, latestUpdate: latestUpdateTimestamp, marketCap, symbol}};
}

function crypto(
  {
    latestUpdate = '2020-01-01',
    marketCap = 27570058643.874947,
    symbol = 'ETH'
  } = {}
) {
  const latestUpdateFormatted = formatISO(parseAsEstDate(latestUpdate));
  return {
    ...cryptoAssetData,
    symbol,
    last_updated: latestUpdateFormatted,
    quote: {
      USD: {
        ...cryptoAssetData.quote.USD,
        market_cap: marketCap
      }
    }
  };
}

const testSeedAssets = (assetRepository: AssetRepository) => async (assets: Asset[]) => {
  return assetRepository.insertAssets(assets);
};

const testFindAssets = (assetRepository: AssetRepository) => async () => {
  return (await assetRepository.findPage(1, 10)).data;
};

describe('Whole flow', () => {
  let doOneUpdate: (date: string) => Promise<void>;
  let seedAssets: (assets: Asset[]) => Promise<any>;
  let findAssets: () => Promise<Asset[]>;

  beforeEach(async () => {
    const {db, iexCloudService, coinmarketCapService, assetRepository, ranksRepository, dashService} = createTestServices();
    doOneUpdate = updater(iexCloudService, coinmarketCapService, assetRepository, ranksRepository, dashService);
    seedAssets = testSeedAssets(assetRepository);
    findAssets = testFindAssets(assetRepository);
    await clearDatabase(db);
  });

  it('daily dash is 0 after first update', async () => {
    await seedAssets([
      anAsset({ticker: 'ETH', assetType: 'Cryptocurrency'}),
      anAsset({ticker: 'AAPL', assetType: 'Stock'})
    ]);

    await iexWillReturn('AAPL', stock({latestUpdate: '2020-05-12 09:55', symbol: 'AAPL', marketCap: 100}));
    await coinmarketcapWillReturn('ETH', crypto({latestUpdate: '2020-05-12 09:55', symbol: 'ETH', marketCap: 50}));
    await doOneUpdate('2020-05-12 10:00');

    const assets = await findAssets();
    expect(assets[0]).to.deep.include({ticker: 'AAPL', dashDaily: 0});
    expect(assets[1]).to.deep.include({ticker: 'ETH', dashDaily: 0});
  });

  it('daily dash depends on first and last rank from day', async () => {
    await seedAssets([
      anAsset({ticker: 'ETH', assetType: 'Cryptocurrency'}),
      anAsset({ticker: 'AAPL', assetType: 'Stock'})
    ]);

    await iexWillReturn('AAPL', stock({latestUpdate: '2020-05-12 09:55', symbol: 'AAPL', marketCap: 100}));
    await coinmarketcapWillReturn('ETH', crypto({latestUpdate: '2020-05-12 09:55', symbol: 'ETH', marketCap: 50}));
    await doOneUpdate('2020-05-12 09:55');
    await iexWillReturn('AAPL', stock({latestUpdate: '2020-05-12 09:56', symbol: 'AAPL', marketCap: 70}));
    await coinmarketcapWillReturn('ETH', crypto({latestUpdate: '2020-05-12 09:56', symbol: 'ETH', marketCap: 71}));
    await doOneUpdate('2020-05-12 09:56');
    await iexWillReturn('AAPL', stock({latestUpdate: '2020-05-12 09:57', symbol: 'AAPL', marketCap: 50}));
    await coinmarketcapWillReturn('ETH', crypto({latestUpdate: '2020-05-12 09:57', symbol: 'ETH', marketCap: 150}));
    await doOneUpdate('2020-05-12 09:57');

    const assets = await findAssets();
    expect(assets[0]).to.deep.include({ticker: 'ETH', dashDaily: 1});
    expect(assets[1]).to.deep.include({ticker: 'AAPL', dashDaily: -1});
  });
});
