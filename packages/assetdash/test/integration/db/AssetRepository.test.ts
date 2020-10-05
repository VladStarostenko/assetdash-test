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
  }, {
    id: 4,
    ticker: 'ETH',
    name: 'Ethan Allen Interiors',
    type: 'Stock',
    currentMarketcap: 1,
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
  }, {
    id: 7,
    assetId: 4,
    date: date,
    position: 4
  }, {
    id: 8,
    assetId: 4,
    date: date,
    position: 4
  }];

  const tags = [{name: 'Cryptocurrency'}, {name: 'Internet'}, {name: 'Finance'}, {name: 'Emerging Markets'}];

  const assetsTags = [
    {assetId: 1, tagId: 1},
    {assetId: 2, tagId: 1},
    {assetId: 3, tagId: 2},
    {assetId: 3, tagId: 3},
    {assetId: 4, tagId: 4}
  ];

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
      expect(await assetRepository.findPage(2, 1, ['Stock', 'ETF', 'Cryptocurrency'])).to.deep.eq({
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
          lastPage: 4,
          perPage: 1,
          to: 2,
          total: 4
        }
      });
    });
  });

  describe('findByString', () => {
    it('returns assets with string in name or ticker', async () => {
      const assets = await assetRepository.findByNameOrTickerPart('t', ['Stock', 'ETF', 'Cryptocurrency']);
      expect(assets).to.have.length(3);
      expect(assets[0]).to.deep.include({name: 'Bitcoin'});
      expect(assets[1]).to.deep.include({name: 'Ethereum'});
      expect(assets[2]).to.deep.include({name: 'Ethan Allen Interiors'});
    });

    it('returns stocks with string in name or ticker when metric selected', async () => {
      const assets = await assetRepository.findByNameOrTickerPart('ETH', ['Stock']);
      expect(assets).to.have.length(1);
      expect(assets[0]).to.deep.include({name: 'Ethan Allen Interiors'});
    });
  });

  describe('findByTags', () => {
    it('returns assets with selected tags', async () => {
      const data = (await assetRepository.findByTags('Internet', 1, 10, ['Stock', 'ETF', 'Cryptocurrency'])).data;
      expect(data).to.have.length(1);
      expect(data[0]).to.deep.include({ticker: 'AAPL'});
    });

    it('returns empty result when selected "Cryptocurrency" tags and "Earnings" metric', async () => {
      const data = (await assetRepository.findByTags('Cryptocurrency', 1, 10, ['Stock'])).data;
      expect(data).to.have.length(0);
    });
  });

  describe('updateEarningsDate', () => {
    it('updates earnings date for stock', async () => {
      const newDate = new Date('2010-10-10');
      await assetRepository.updateEarningsDate('AAPL', newDate);
      expect((await assetRepository.findById(3))['earningsDate'])
        .be.deep.eq(newDate);
    });

    it('updates earnings date for stock when earnings date null', async () => {
      const newDate = null;
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

    it('updates EPS for stock when EPS null', async () => {
      const newEps = null;
      await assetRepository.updateEps('AAPL', newEps);
      expect((await assetRepository.findById(3)).eps)
        .be.eq(newEps);
    });
  });
});
