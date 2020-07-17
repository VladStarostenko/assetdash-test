import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {PricingDataUpdater} from '../../src/app/PricingDataUpdater';
import {clearDatabase} from '../helpers/clear-db';
import {RanksRepository} from '../../src/integration/db/repositories/RanksRepository';
import {createTestServices} from '../helpers/createTestServices';

chai.use(chaiAsPromised);

describe('PricingDataUpdater', () => {
  let pricingDataUpdater: PricingDataUpdater;
  let assetRepository;
  let db;
  const ranksRepository = new RanksRepository(db);

  beforeEach(() => {
    let iexCloudService;
    let coinmarketCapService;
    ({db, assetRepository, iexCloudService, coinmarketCapService} = createTestServices());pricingDataUpdater = new PricingDataUpdater(
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

      await ranksRepository.insertRanks([{
        id: 1,
        assetId: 1,
        position: 2,
        date: new Date(new Date().setUTCHours(0, 0, 0, 0) - 86400000)
      }, {
        id: 2,
        assetId: 2,
        position: 1,
        date: new Date(new Date().setUTCHours(0, 0, 0, 0) - 86400000)
      }]);
    });

    it('updates ranks for assets', async () => {
      await pricingDataUpdater.updateRanksForAssets();
      const date = new Date(new Date().setUTCHours(0, 0, 0, 0) - 86400000);
      expect((await assetRepository.findByIdWithRank(1, date)).rank).be.eq(2);
      expect((await assetRepository.findByIdWithRank(2, date)).rank).be.eq(1);
    });

    it('inserts ranks for assets with new date', async () => {
      await pricingDataUpdater.updateRanksForAssets();
      const date = new Date(new Date().setUTCHours(0, 0, 0, 0));
      expect((await assetRepository.findByIdWithRank(1, date)).rank).be.eq(2);
      expect((await assetRepository.findByIdWithRank(2, date)).rank).be.eq(1);
    });
  });
});
