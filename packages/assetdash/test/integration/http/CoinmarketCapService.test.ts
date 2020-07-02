import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {CoinmarketCapService} from '../../../src/integration/http/CoinmarketCapService';

chai.use(chaiAsPromised);

describe('CoinmarketCap', () => {
  let service: CoinmarketCapService;

  beforeEach(() => {
    service = new CoinmarketCapService();
  });

  describe('getCoinsQuotes', () => {
    it('makes a correct request and returns country code', async () => {
      const data = await service.getAssetsData(['ETH', 'BTC', 'ADA']);
      expect(data).to.have.nested.property('data.ETH');
      expect(data['data']['ETH']['id']).to.eq(1027);
      expect(data).to.have.nested.property('data.BTC');
      expect(data).to.have.nested.property('data.ADA');
    });
  });
});
