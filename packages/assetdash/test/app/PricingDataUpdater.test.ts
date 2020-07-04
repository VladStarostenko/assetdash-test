import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {PricingDataUpdater} from '../../src/app/PricingDataUpdater';
import {CoinmarketCapService} from '../../src/integration/http/CoinmarketCapService';
import {AssetRepository} from '../../src/integration/db/repositories/AssetRepository';
import knex from 'knex';
import {config} from '../../src/config/config';

chai.use(chaiAsPromised);

describe('PricingDataUpdater', () => {
  let pricingDataUpdater: PricingDataUpdater;
  const db = knex(config.database);
  const assetRepository = new AssetRepository(db);

  beforeEach(() => {
    pricingDataUpdater = new PricingDataUpdater(new CoinmarketCapService(), assetRepository);
  });

  describe('updateAssetPrices', () => {
    before(async () => {
      await assetRepository.insertAsset({
        ticker: 'ETH',
        name: 'Ethereum',
        imageUrl: 'eth.img',
        type: 'Cryptocurrency'
      });
    });

    it('Update price', async () => {
      await pricingDataUpdater.updateCryptoAssetPrices(['ETH']);
      expect((await assetRepository.findById(1)).currentPrice).to.not.be.undefined;
    });
  });
});
