import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {PricingDataUpdater} from '../../src/app/PricingDataUpdater';
import {CoinmarketCapService} from '../../src/integration/http/CoinmarketCapService';
import {AssetRepository} from '../../src/integration/db/repositories/AssetRepository';
import knex from 'knex';
import {config} from '../../src/config/config';
import {IexCloudService} from '../../src/integration/http/IexCloudService';
import {clearDatabase} from '../helpers/clear-db';

chai.use(chaiAsPromised);

describe('PricingDataUpdater', () => {
  let pricingDataUpdater: PricingDataUpdater;
  const db = knex(config.database);
  const assetRepository = new AssetRepository(db);

  beforeEach(() => {
    pricingDataUpdater = new PricingDataUpdater(new IexCloudService(''), new CoinmarketCapService(), assetRepository);
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
