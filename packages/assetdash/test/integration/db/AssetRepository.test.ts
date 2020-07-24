import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {clearDatabase} from '../../helpers/clear-db';
import {AssetRepository} from '../../../src/integration/db/repositories/AssetRepository';
import {createTestServices} from '../../helpers/createTestServices';
import {RanksRepository} from '../../../src/integration/db/repositories/RanksRepository';
import {Asset} from '../../../src/core/models/asset';
import {startOfToday} from 'date-fns';

chai.use(chaiAsPromised);

describe('Asset Repository', () => {
  let assetRepository: AssetRepository;
  let ranksRepository: RanksRepository;
  const assets: Asset[] = [{
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
    ticker: 'BCH',
    name: 'Bitcoin Cash',
    imageUrl: 'bch.img',
    type: 'Cryptocurrency',
    currentMarketcap: 5
  }];

  const date = startOfToday();
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
  }];

  beforeEach(async () => {
    let db;
    ({db, assetRepository, ranksRepository} = createTestServices());
    await clearDatabase(db);
    await assetRepository.insertAssets(assets);
    await ranksRepository.insertRanks(ranks);
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
        .to.deep.eq(['ETH', 'BTC', 'BCH']);
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
          imageUrl: 'eth.img',
          name: 'Ethereum',
          ticker: 'ETH',
          type: 'Cryptocurrency'
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
      expect(await assetRepository.findByNameOrTickerPart('h'))
        .to.deep.eq([
          {
            currentChange: 0,
            currentMarketcap: 10,
            currentPrice: 0,
            dashDaily: 0,
            dashMonthly: 0,
            dashWeekly: 0,
            id: 1,
            imageUrl: 'eth.img',
            name: 'Ethereum',
            ticker: 'ETH',
            type: 'Cryptocurrency',
            rank: 2
          }, {
            currentChange: 0,
            currentMarketcap: 5,
            currentPrice: 0,
            dashDaily: 0,
            dashMonthly: 0,
            dashWeekly: 0,
            id: 3,
            imageUrl: 'bch.img',
            name: 'Bitcoin Cash',
            ticker: 'BCH',
            type: 'Cryptocurrency',
            rank: 3
          }]
        );
    });
  });

  describe('findByIds', () => {
    it('returns assets with the submitted ids', async () => {
      expect(await assetRepository.findByIds([1, 2]))
        .to.deep.eq([{
          currentChange: 0,
          currentMarketcap: 10,
          currentPrice: 0,
          dashDaily: 0,
          dashMonthly: 0,
          dashWeekly: 0,
          id: 1,
          imageUrl: 'eth.img',
          name: 'Ethereum',
          ticker: 'ETH',
          type: 'Cryptocurrency'
        }, {
          currentChange: 0,
          currentMarketcap: 20,
          currentPrice: 0,
          dashDaily: 0,
          dashMonthly: 0,
          dashWeekly: 0,
          id: 2,
          imageUrl: 'btc.img',
          name: 'Bitcoin',
          ticker: 'BTC',
          type: 'Cryptocurrency'
        }]
        );
    });
  });
});
