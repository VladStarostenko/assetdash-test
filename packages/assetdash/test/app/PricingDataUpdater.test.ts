import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {PricingDataUpdater} from '../../src/app/PricingDataUpdater';
import {clearDatabase} from '../helpers/clear-db';
import {createTestServices} from '../helpers/createTestServices';

chai.use(chaiAsPromised);

describe('PricingDataUpdater', () => {
  let pricingDataUpdater: PricingDataUpdater;
  let assetRepository;
  let db;

  beforeEach(() => {
    let iexCloudService;
    let coinmarketCapService;
    ({db, assetRepository, iexCloudService, coinmarketCapService} = createTestServices());
    pricingDataUpdater = new PricingDataUpdater(iexCloudService, coinmarketCapService, assetRepository);
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
});
