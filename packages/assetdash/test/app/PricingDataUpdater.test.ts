import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {PricingDataUpdater} from '../../src/app/PricingDataUpdater';
import {Rank} from '../../src/core/models/rank';
import {parseAsEstDate} from '../../src/core/utils';
import {clearDatabase} from '../helpers/clear-db';
import {createTestServices} from '../helpers/createTestServices';
import {assetWithId, insertRanks} from '../helpers/fixtures';

chai.use(chaiAsPromised);

describe('PricingDataUpdater', () => {
  let pricingDataUpdater: PricingDataUpdater;
  let assetRepository;
  let ranksRepository;
  let db;
  let storeRanks: (ranks: Rank[]) => Promise<void>;
  let logger;

  beforeEach(() => {
    let iexCloudService;
    let coinmarketCapService;
    let dashService;
    ({db, assetRepository, iexCloudService, coinmarketCapService, ranksRepository, dashService, logger} = createTestServices(true));
    pricingDataUpdater = new PricingDataUpdater(
      iexCloudService, coinmarketCapService, assetRepository, ranksRepository, dashService, logger
    );
    storeRanks = insertRanks(ranksRepository);
  });

  describe('updateAssetPrices', () => {
    beforeEach(async () => {
      await clearDatabase(db);
      await assetRepository.insertAsset({
        ticker: 'ETH',
        name: 'Ethereum',
        type: 'Cryptocurrency',
        id: 1
      });
    });

    it('Update price', async () => {
      await pricingDataUpdater.updateCryptoAssetPrices(['ETH']);
      expect((await assetRepository.findById(1)).currentPrice).to.not.be.undefined;
    });
  });

  describe('updateAssetRanks', () => {
    const TODAYOPEN = parseAsEstDate('2020-05-12 09:00');
    const TODAY = parseAsEstDate('2020-05-12 12:00');
    const YESTERDAY = parseAsEstDate('2020-05-11 12:00');

    beforeEach(async () => {
      await clearDatabase(db);
      await assetRepository.insertAssets([{
        ticker: 'ETH',
        name: 'Ethereum',
        type: 'Cryptocurrency',
        id: 1,
        currentMarketcap: 10
      }, {
        ticker: 'BTC',
        name: 'Bitcoin',
        type: 'Cryptocurrency',
        id: 2,
        currentMarketcap: 20
      }]);
    });

    it('inserts ranks for assets with new date', async () => {
      await pricingDataUpdater.updateRanksForAssets(TODAYOPEN);
      const data = (await assetRepository.findPage(1, 2, ['Stock', 'ETF', 'Cryptocurrency'])).data;
      expect(await ranksRepository.findOpenFor(TODAY, 2)).to.deep.include({position: 1, date: TODAYOPEN});
      expect(await ranksRepository.findOpenFor(TODAY, 1)).to.deep.include({position: 2, date: TODAYOPEN});
      expect(data[0]).to.deep.include({id: 2, rank: 1});
      expect(data[1]).to.deep.include({id: 1, rank: 2});
    });

    it('update ranks for today does not change ranks from yesterday', async () => {
      await storeRanks([{
        assetId: 1,
        position: 1,
        date: YESTERDAY
      }, {
        assetId: 2,
        position: 2,
        date: YESTERDAY
      }]);
      await pricingDataUpdater.updateRanksForAssets(TODAYOPEN);
      expect(await ranksRepository.findMostRecentFor(YESTERDAY, 1)).to.deep.include({position: 1, date: YESTERDAY});
      expect(await ranksRepository.findMostRecentFor(YESTERDAY, 2)).to.deep.include({position: 2, date: YESTERDAY});
    });

    it('update ranks for today', async () => {
      await storeRanks([{
        assetId: 1,
        position: 1,
        date: TODAYOPEN
      }, {
        assetId: 2,
        position: 2,
        date: TODAYOPEN
      }]);
      await pricingDataUpdater.updateRanksForAssets(TODAYOPEN);
      expect(await ranksRepository.findOpenFor(TODAY, 1)).to.deep.include({position: 1, date: TODAYOPEN});
      expect(await ranksRepository.findOpenFor(TODAY, 2)).to.deep.include({position: 2, date: TODAYOPEN});
      expect(await ranksRepository.findMostRecentFor(TODAY, 1)).to.deep.include({position: 2, date: TODAYOPEN});
      expect(await ranksRepository.findMostRecentFor(TODAY, 2)).to.deep.include({position: 1, date: TODAYOPEN});

      const data = (await assetRepository.findPage(1, 20, ['Stock', 'ETF', 'Cryptocurrency'])).data;
      expect(data).to.have.length(2);
      expect(data[0]).to.deep.include({id: 2, rank: 1});
      expect(data[1]).to.deep.include({id: 1, rank: 2});
    });
  });

  describe('update dash', () => {
    beforeEach(async () => {
      await clearDatabase(db);
      await assetRepository.insertAsset(assetWithId(1));
    });

    it('update daily, weekly and monthly dash ', async () => {
      const now = parseAsEstDate('2020-05-15 12:41');
      await ranksRepository.updateRank({assetId: 1, position: 110, date: parseAsEstDate('2020-05-01 09:40')});
      await ranksRepository.updateRank({assetId: 1, position: 100, date: parseAsEstDate('2020-05-11 09:40')});
      await ranksRepository.updateRank({assetId: 1, position: 95, date: parseAsEstDate('2020-05-15 09:40')});
      await ranksRepository.updateRank({assetId: 1, position: 92, date: parseAsEstDate('2020-05-15 12:40')});

      await pricingDataUpdater.updateDash(now);

      expect((await assetRepository.findById(1)).dashDaily).to.be.eq(3);
      expect((await assetRepository.findById(1)).dashWeekly).to.be.eq(8);
      expect((await assetRepository.findById(1)).dashMonthly).to.be.eq(18);
    });
  });
});
