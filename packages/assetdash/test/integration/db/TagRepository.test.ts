import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {config} from '../../../src/config/config';
import {clearDatabase} from '../../helpers/clear-db';
import knex from 'knex';
import pg from 'pg';
import {TagRepository} from '../../../src/integration/db/repositories/TagRepository';
import {AssetRepository} from '../../../src/integration/db/repositories/AssetRepository';

const PG_DECIMAL_OID = 1700;

chai.use(chaiAsPromised);

describe('Tags Repository', () => {
  const db = knex(config.database);
  pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);
  const tagRepository = new TagRepository(db);
  const assetRepository = new AssetRepository(db);

  const assets = [{
    id: 1,
    ticker: 'ETH',
    name: 'Ethereum',
    imageUrl: 'eth.img',
    type: 'Cryptocurrency',
    currentMarketcap: 10
  }, {
    id: 2,
    ticker: 'BTC',
    name: 'Bitcoin',
    imageUrl: 'btc.img',
    type: 'Cryptocurrency',
    currentMarketcap: 20
  }, {
    id: 3,
    ticker: 'AAPL',
    name: 'Apple',
    imageUrl: 'aapl.img',
    type: 'Stocks',
    currentMarketcap: 30
  }];

  const tags = [{name: 'Cryptocurrency'}, {name: 'Internet'}, {name: 'Finance'}];

  const assetsTags = [{assetId: 1, tagId: 1}, {assetId: 2, tagId: 1}, {assetId: 3, tagId: 2}, {assetId: 3, tagId: 3}];

  beforeEach(async () => {
    await clearDatabase(db);
    await assetRepository.insertAssets(assets);
    await tagRepository.insertTags(tags);
    await tagRepository.insertAssetsTags(assetsTags);
  });

  describe('Find', () => {
    it('finds assets by tagId', async () => {
      expect((await tagRepository.findByTagIds([1]))).to.deep.eq([{assetId: 1}, {assetId: 2}]);
    });
  });
});
