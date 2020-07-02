import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import knex from 'knex';
import {config} from '../../../src/config/config';
import {AssetRepository} from '../../../src/integration/db/repositories/AssetRepository';

chai.use(chaiAsPromised);

describe('Asset Repository', () => {
  const db = knex(config.database);
  const assetRepository = new AssetRepository(db);

  describe('Update', () => {
    before(async () => {
      await assetRepository.insertAsset({
        ticker: 'ETH',
        name: 'Ethereum',
        imageUrl: 'eth.img',
        type: 'Cryptocurrency'
      });
    });

    it('Update price', async () => {
      await assetRepository.updatePrice({
        ticker: 'ETH',
        price: 10,
        marketcap: 1000
      });
      expect((await assetRepository.findById(1)).currentPrice).to.deep.eq('10.000000000000000000');
    });
  });
});
