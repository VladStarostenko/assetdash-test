import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {config} from '../../../src/config/config';
import {createServices} from '../../../src/core/createServices';
import {clearDatabase} from '../../helpers/clear-db';

chai.use(chaiAsPromised);

describe('Asset Repository', () => {
  const {db, assetRepository} = createServices(config);

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
  }];

  beforeEach(async () => {
    await clearDatabase(db);
    await assetRepository.insertAssets(assets);
  });

  describe('Update', () => {
    it('Update price', async () => {
      await assetRepository.updatePrice({
        ticker: 'ETH',
        price: 10.54,
        marketcap: 1000,
        change: 0.2
      });
      expect((await assetRepository.findById(1)).currentPrice).to.deep.eq(10.54);
    });
  });

  describe('getTickers', () => {
    it('get cryptocurrency tickers', async () => {
      expect(await assetRepository.getTickers('Cryptocurrency'))
        .to.deep.eq([{ticker: 'ETH'}, {ticker: 'BTC'}]);
    });
  });

  describe('findPage', () => {
    it('return selected page of assets', async () => {
      expect(await assetRepository.findPage(2, 1)).to.deep.eq(
        [{
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
        }
        ]);
    });
  });
});
