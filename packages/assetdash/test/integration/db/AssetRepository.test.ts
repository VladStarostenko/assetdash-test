import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {config} from '../../../src/config/config';
import {createServices} from '../../../src/core/createServices';

chai.use(chaiAsPromised);

describe('Asset Repository', () => {
  const {db, assetRepository} = createServices(config);
  const asset = {
    ticker: 'ETH',
    name: 'Ethereum',
    imageUrl: 'eth.img',
    type: 'Cryptocurrency'
  };

  beforeEach(async () => {
    db('assets').truncate();
    await assetRepository.insertAsset(asset);
  });

  describe('Update', () => {
    it('Update price', async () => {
      await assetRepository.updatePrice({
        ticker: 'ETH',
        price: 10.54,
        marketcap: 1000
      });
      expect((await assetRepository.findById(1)).currentPrice).to.deep.eq(10.54);
    });
  });

  describe('getTickers', () => {
    it('get cryptocurrency tickers', async () => {
      expect(await assetRepository.getTickers('Cryptocurrency')).to.deep.include({ticker: 'ETH'});
    });
  });
});
