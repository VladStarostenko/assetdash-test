import nock from 'nock';
import {IexCloudService} from '../../../src/integration/http/IexCloudService';
import {expect} from 'chai';

describe('IexCloud', () => {
  it('queries in batches', async () => {
    nock(/iexcloud\.test/)
      .get(/.*/)
      .reply(200, {
        ETH: {},
        BTC: {}
      })
      .get(/.*/)
      .reply(200, {
        ZRX: {}
      });

    const service = new IexCloudService('http://iexcloud.test', 2);
    const result = await service.getAssetsData(['ETH', 'BTC', 'ZRX']);
    expect(result).to.deep.include({ETH: {}, BTC: {}, ZRX: {}});
  });
});
