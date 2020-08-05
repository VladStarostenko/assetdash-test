import {expect} from 'chai';
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
import {Logger} from '../../src/core/Logger';

const updater = (iexCloudService: IexCloudService,
  coinmarketCapService: CoinmarketCapService,
  assetRepository: AssetRepository,
  ranksRepository: RanksRepository,
  dashService: DashService,
  logger: Logger) => async (date: string) => {
  const pricingDataUpdater = new PricingDataUpdater(
    iexCloudService,
    coinmarketCapService,
    assetRepository,
    ranksRepository,
    dashService,
    logger);
  await pricingDataUpdater.updateCryptoAssetPrices(await assetRepository.getTickers('Cryptocurrency'));
  const stockAndETFTickers = (await assetRepository.getTickers('Stock')).concat(await assetRepository.getTickers('ETF'));
  await pricingDataUpdater.updateStocksAndETFsAssetPrices(stockAndETFTickers);
  await pricingDataUpdater.updateRanksForAssets(parseAsEstDate(date));
  await pricingDataUpdater.updateDash(parseAsEstDate(date));
};

async function iexWillReturn(iexResponse: any) {
  nock(/iexcloud\.test/)
    .get(new RegExp(iexResponse.symbol))
    .reply(200, {
      ticker: iexResponse
    });
}

async function coinmarketcapWillReturn(coinmarketcapResponse: any[]) {
  const result = {};
  coinmarketcapResponse.forEach((crypto) => {
    result[crypto.symbol] = crypto;
  });
  nock(/coinmarketcap\.test/)
    .get(new RegExp(coinmarketcapResponse[0].symbol))
    .reply(200, {
      data: result
    });
}

function stock(
  {
    marketCap = 1652987245800,
    symbol = 'AAPL'
  } = {}
) {
  return {quote: {...stockAssetData.quote, marketCap, symbol}};
}

function crypto(
  {
    marketCap = 27570058643.874947,
    symbol = 'ETH'
  } = {}
) {
  return {
    ...cryptoAssetData,
    symbol,
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
    const {db, iexCloudService, coinmarketCapService, assetRepository, ranksRepository, dashService, logger} = createTestServices();
    doOneUpdate = updater(iexCloudService, coinmarketCapService, assetRepository, ranksRepository, dashService, logger);
    seedAssets = testSeedAssets(assetRepository);
    findAssets = testFindAssets(assetRepository);
    await clearDatabase(db);
  });

  it('daily dash is 0 after first update', async () => {
    await seedAssets([
      anAsset({ticker: 'ETH', assetType: 'Cryptocurrency'}),
      anAsset({ticker: 'AAPL', assetType: 'Stock'})
    ]);

    await iexWillReturn(stock({symbol: 'AAPL', marketCap: 100}));
    await coinmarketcapWillReturn([crypto({symbol: 'ETH', marketCap: 50})]);
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

    await iexWillReturn(stock({symbol: 'AAPL', marketCap: 100}));
    await coinmarketcapWillReturn([crypto({symbol: 'ETH', marketCap: 50})]);
    await doOneUpdate('2020-05-12 09:55');
    await iexWillReturn(stock({symbol: 'AAPL', marketCap: 70}));
    await coinmarketcapWillReturn([crypto({symbol: 'ETH', marketCap: 71})]);
    await doOneUpdate('2020-05-12 09:56');
    await iexWillReturn(stock({symbol: 'AAPL', marketCap: 50}));
    await coinmarketcapWillReturn([crypto({symbol: 'ETH', marketCap: 150})]);
    await doOneUpdate('2020-05-12 09:57');

    const assets = await findAssets();
    expect(assets[0]).to.deep.include({ticker: 'ETH', dashDaily: 1});
    expect(assets[1]).to.deep.include({ticker: 'AAPL', dashDaily: -1});
  });

  it('resets daily dash at 9:00 am', async () => {
    await seedAssets([
      anAsset({ticker: 'ETH', assetType: 'Cryptocurrency'}),
      anAsset({ticker: 'BTC', assetType: 'Cryptocurrency'}),
      anAsset({ticker: 'AAPL', assetType: 'Stock'})
    ]);

    await iexWillReturn(stock({symbol: 'AAPL', marketCap: 100}));
    await coinmarketcapWillReturn([
      crypto({symbol: 'ETH', marketCap: 50}),
      crypto({symbol: 'BTC', marketCap: 70})
    ]);
    await doOneUpdate('2020-05-12 08:55');

    await iexWillReturn(stock({symbol: 'AAPL', marketCap: 100}));
    await coinmarketcapWillReturn([
      crypto({symbol: 'ETH', marketCap: 70}),
      crypto({symbol: 'BTC', marketCap: 60})]);
    await doOneUpdate('2020-05-12 08:56');

    await iexWillReturn(stock({symbol: 'AAPL', marketCap: 100}));
    await coinmarketcapWillReturn([
      crypto({symbol: 'ETH', marketCap: 70}),
      crypto({symbol: 'BTC', marketCap: 60})
    ]);
    await doOneUpdate('2020-05-12 09:00');

    const assets = await findAssets();
    expect(assets[0]).to.deep.include({ticker: 'AAPL', dashDaily: 0});
    expect(assets[1]).to.deep.include({ticker: 'ETH', dashDaily: 0});
    expect(assets[2]).to.deep.include({ticker: 'BTC', dashDaily: 0});
  });

  it('dont update dash for stocks and ETFs when outside trading hours', async () => {
    await seedAssets([
      anAsset({ticker: 'ETH', assetType: 'Cryptocurrency'}),
      anAsset({ticker: 'BTC', assetType: 'Cryptocurrency'}),
      anAsset({ticker: 'AAPL', assetType: 'Stock'})
    ]);

    await iexWillReturn(stock({symbol: 'AAPL', marketCap: 100}));
    await coinmarketcapWillReturn([
      crypto({symbol: 'ETH', marketCap: 50}),
      crypto({symbol: 'BTC', marketCap: 70})
    ]);
    await doOneUpdate('2020-05-12 15:55');

    await iexWillReturn(stock({symbol: 'AAPL', marketCap: 90}));
    await coinmarketcapWillReturn([
      crypto({symbol: 'ETH', marketCap: 60}),
      crypto({symbol: 'BTC', marketCap: 100})]);
    await doOneUpdate('2020-05-12 15:59');

    await iexWillReturn(stock({symbol: 'AAPL', marketCap: 90}));
    await coinmarketcapWillReturn([
      crypto({symbol: 'ETH', marketCap: 95}),
      crypto({symbol: 'BTC', marketCap: 105})
    ]);
    await doOneUpdate('2020-05-12 16:05');

    let assets = await findAssets();
    expect(assets[0]).to.deep.include({ticker: 'BTC', dashDaily: 1});
    expect(assets[1]).to.deep.include({ticker: 'ETH', dashDaily: 1});
    expect(assets[2]).to.deep.include({ticker: 'AAPL', dashDaily: -1});

    await iexWillReturn(stock({symbol: 'AAPL', marketCap: 90}));
    await coinmarketcapWillReturn([
      crypto({symbol: 'ETH', marketCap: 95}),
      crypto({symbol: 'BTC', marketCap: 80})
    ]);
    await doOneUpdate('2020-05-13 08:55');

    assets = await findAssets();
    expect(assets[0]).to.deep.include({ticker: 'ETH', dashDaily: 2, dashWeekly: 2, dashMonthly: 2});
    expect(assets[1]).to.deep.include({ticker: 'AAPL', dashDaily: -1, dashWeekly: -1, dashMonthly: -1});
    expect(assets[2]).to.deep.include({ticker: 'BTC', dashDaily: -1, dashWeekly: -1, dashMonthly: -1});

    await iexWillReturn(stock({symbol: 'AAPL', marketCap: 100}));
    await coinmarketcapWillReturn([
      crypto({symbol: 'ETH', marketCap: 95}),
      crypto({symbol: 'BTC', marketCap: 80})
    ]);
    await doOneUpdate('2020-05-13 09:00');

    assets = await findAssets();
    expect(assets[0]).to.deep.include({ticker: 'AAPL', dashDaily: 0, dashWeekly: 0, dashMonthly: 0});
    expect(assets[1]).to.deep.include({ticker: 'ETH', dashDaily: 0, dashWeekly: 1, dashMonthly: 1});
    expect(assets[2]).to.deep.include({ticker: 'BTC', dashDaily: 0, dashWeekly: -1, dashMonthly: -1});
  });

  it('dont update dash for stocks and ETFs during weekends', async () => {
    await seedAssets([
      anAsset({ticker: 'ETH', assetType: 'Cryptocurrency'}),
      anAsset({ticker: 'AAPL', assetType: 'Stock'})
    ]);

    await iexWillReturn(stock({symbol: 'AAPL', marketCap: 50}));
    await coinmarketcapWillReturn([crypto({symbol: 'ETH', marketCap: 100})]);
    await doOneUpdate('2020-05-15 10:00'); // Friday morning
    await iexWillReturn(stock({symbol: 'AAPL', marketCap: 100}));
    await coinmarketcapWillReturn([crypto({symbol: 'ETH', marketCap: 50})]);
    await doOneUpdate('2020-05-15 15:00'); // Friday afternoon

    const friAssets = await findAssets();
    expect(friAssets[0]).to.deep.include({ticker: 'AAPL', dashDaily: 1, dashWeekly: 1, dashMonthly: 1});
    expect(friAssets[1]).to.deep.include({ticker: 'ETH', dashDaily: -1, dashWeekly: -1, dashMonthly: -1});

    await iexWillReturn(stock({symbol: 'AAPL', marketCap: 100}));
    await coinmarketcapWillReturn([crypto({symbol: 'ETH', marketCap: 60})]);
    await doOneUpdate('2020-05-16 10:00'); // Saturday morning
    await iexWillReturn(stock({symbol: 'AAPL', marketCap: 100}));
    await coinmarketcapWillReturn([crypto({symbol: 'ETH', marketCap: 150})]);
    await doOneUpdate('2020-05-16 15:00'); // Saturday afternoon
    const satAssets = await findAssets();
    expect(satAssets[0]).to.deep.include({ticker: 'ETH', dashDaily: 1, dashWeekly: 0, dashMonthly: 0});
    expect(satAssets[1]).to.deep.include({ticker: 'AAPL', dashDaily: 1, dashWeekly: 1, dashMonthly: 1});
  });
});

// Mo Tu We Th Fr Sa Su
//              1  2  3
//  4  5  6  7  8  9 10
// 11 12 13 14 15 16 17
// 18 19 20 21 22 23 24
// 25 26 27 28 29 30 31
