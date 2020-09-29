import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {Asset} from '../../../src/core/models/asset';
import {AssetRepository} from '../../../src/integration/db/repositories/AssetRepository';
import {RanksRepository} from '../../../src/integration/db/repositories/RanksRepository';
import {clearDatabase} from '../../helpers/clear-db';
import {createTestServices} from '../../helpers/createTestServices';
import {insertRanks} from '../../helpers/fixtures';

chai.use(chaiAsPromised);

describe('Asset Repository', () => {
  let assetRepository: AssetRepository;
  let ranksRepository: RanksRepository;
  const date = new Date();

  const assets: Asset[] = [{
    id: 1,
    ticker: 'ETH',
    name: 'Ethereum',
    type: 'Cryptocurrency',
    currentMarketcap: 10,
    earningsDate: date,
    eps: 5
  }, {
    id: 2,
    ticker: 'BTC',
    name: 'Bitcoin',
    type: 'Cryptocurrency',
    currentMarketcap: 20,
    earningsDate: date,
    eps: 5
  }, {
    id: 3,
    ticker: 'AAPL',
    name: 'Apple',
    type: 'Stock',
    currentMarketcap: 5,
    earningsDate: date,
    eps: 5
  }];

  const ranks = [{
    id: 1,
    assetId: 1,
    date: date,
    position: 2
  }, {
    id: 2,
    assetId: 2,
    date: date,
    position: 1
  }, {
    id: 3,
    assetId: 3,
    date: date,
    position: 3
  }, {
    id: 4,
    assetId: 1,
    date: date,
    position: 2
  }, {
    id: 5,
    assetId: 2,
    date: date,
    position: 1
  }, {
    id: 6,
    assetId: 3,
    date: date,
    position: 3
  }];

  const tags = [{name: 'Cryptocurrency'}, {name: 'Internet'}, {name: 'Finance'}];

  const assetsTags = [{assetId: 1, tagId: 1}, {assetId: 2, tagId: 1}, {assetId: 3, tagId: 2}, {assetId: 3, tagId: 3}];

  beforeEach(async () => {
    let db;
    let tagRepository;
    ({db, assetRepository, ranksRepository, tagRepository} = createTestServices());
    await clearDatabase(db);
    await assetRepository.insertAssets(assets);
    await (insertRanks(ranksRepository))(ranks);
    await tagRepository.insertTags(tags);
    await tagRepository.insertAssetsTags(assetsTags);
  });

  describe('Update', () => {
    it('updates price', async () => {
      await assetRepository.updatePrice({
        ticker: 'ETH',
        price: 10.54,
        marketcap: 1000,
        change: 0.2,
        type: ['Cryptocurrency']
      });
      expect((await assetRepository.findById(1)).currentPrice).to.deep.eq(10.54);
    });
  });

  describe('getTickers', () => {
    it('gets cryptocurrency tickers', async () => {
      expect(await assetRepository.getTickers('Cryptocurrency'))
        .to.deep.eq(['ETH', 'BTC']);
    });
  });

  describe('findPage', () => {
    it('returns selected page of assets', async () => {
      expect(await assetRepository.findPage(2, 1)).to.deep.eq({
        data: [{
          currentChange: 0,
          currentMarketcap: 10,
          currentPrice: 0,
          dashDaily: 0,
          dashMonthly: 0,
          dashWeekly: 0,
          id: 1,
          rank: 2,
          name: 'Ethereum',
          ticker: 'ETH',
          type: 'Cryptocurrency',
          earningsDate: date,
          eps: 5
        }],
        pagination: {
          currentPage: 2,
          from: 1,
          lastPage: 3,
          perPage: 1,
          to: 2,
          total: 3
        }
      });
    });
  });

  describe('findByString', () => {
    it('returns assets with string in name or ticker', async () => {
      const assets = await assetRepository.findByNameOrTickerPart('t');
      expect(assets).to.have.length(2);
      expect(assets[0]).to.deep.include({name: 'Bitcoin'});
      expect(assets[1]).to.deep.include({name: 'Ethereum'});
    });
  });

  describe('findByTags', () => {
    it('returns assets with selected tags', async () => {
      const data = (await assetRepository.findByTags('Internet', 1, 10)).data;
      expect(data).to.have.length(1);
      expect(data[0]).to.deep.include({ticker: 'AAPL'});
    });
  });

  describe('updateEarningsDate', () => {
    it('updates earnings date for stock', async () => {
      const newDate = new Date('2010-10-10');
      await assetRepository.updateEarningsDate('AAPL', newDate);
      expect((await assetRepository.findById(3))['earningsDate'])
        .be.deep.eq(newDate);
    });
  });

  describe('updateEps', () => {
    it('updates EPS for stock', async () => {
      const newEps = 10;
      await assetRepository.updateEps('AAPL', newEps);
      expect((await assetRepository.findById(3)).eps)
        .be.eq(newEps);
    });
  });
});
