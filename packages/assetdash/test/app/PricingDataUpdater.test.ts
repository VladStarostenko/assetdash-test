import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {PricingDataUpdater} from '../../src/app/PricingDataUpdater';
import {clearDatabase} from '../helpers/clear-db';
import {createTestServices} from '../helpers/createTestServices';
import {startOfDay, startOfToday, startOfYesterday} from 'date-fns';

chai.use(chaiAsPromised);

describe('PricingDataUpdater', () => {
  let pricingDataUpdater: PricingDataUpdater;
  let assetRepository;
  let ranksRepository;
  let db;

  beforeEach(() => {
    let iexCloudService;
    let coinmarketCapService;
    ({db, assetRepository, iexCloudService, coinmarketCapService, ranksRepository} = createTestServices());
    pricingDataUpdater = new PricingDataUpdater(
      iexCloudService, coinmarketCapService,
      assetRepository,
      ranksRepository);
  });

  describe('updateAssetPrices', () => {
    beforeEach(async () => {
      await clearDatabase(db);
      await assetRepository.insertAsset({
        ticker: 'ETH',
        name: 'Ethereum',
        imageUrl: 'eth.img',
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
    const TODAY = startOfToday();
    const YESTERDAY = startOfYesterday();

    beforeEach(async () => {
      await clearDatabase(db);
      await assetRepository.insertAssets([{
        ticker: 'ETH',
        name: 'Ethereum',
        imageUrl: 'eth.img',
        type: 'Cryptocurrency',
        id: 1,
        currentMarketcap: 10
      }, {
        ticker: 'BTC',
        name: 'Bitcoin',
        imageUrl: 'btc.img',
        type: 'Cryptocurrency',
        id: 2,
        currentMarketcap: 20
      }]);
    });

    it('update ranks for today does not change ranks from yesterday', async () => {
      await ranksRepository.insertRanks([{
        assetId: 1,
        position: 2,
        date: YESTERDAY
      }, {
        assetId: 2,
        position: 1,
        date: YESTERDAY
      }]);
      await pricingDataUpdater.updateRanksForAssets();
      expect((await assetRepository.findByIdWithRank(1, YESTERDAY)).rank).be.eq(2);
      expect((await assetRepository.findByIdWithRank(2, YESTERDAY)).rank).be.eq(1);
    });

    it('update ranks for today', async () => {
      await ranksRepository.insertRanks([{
        assetId: 1,
        position: 1,
        date: TODAY
      }, {
        assetId: 2,
        position: 2,
        date: TODAY
      }]);
      await pricingDataUpdater.updateRanksForAssets();
      expect((await assetRepository.findByIdWithRank(1, TODAY)).rank).be.eq(2);
      expect((await assetRepository.findByIdWithRank(2, TODAY)).rank).be.eq(1);
    });

    it('inserts ranks for assets with new date', async () => {
      await pricingDataUpdater.updateRanksForAssets();
      expect((await assetRepository.findByIdWithRank(1, TODAY)).rank).be.eq(2);
      expect((await assetRepository.findByIdWithRank(2, TODAY)).rank).be.eq(1);
    });
  });
});
