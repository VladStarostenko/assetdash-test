import nock from 'nock';
import {IexCloudService} from '../../../src/integration/http/IexCloudService';
import {expect} from 'chai';
import {Logger} from '../../../src/core/Logger';

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
    const logger = new Logger();
    const result = await service.getAssetsData(['ETH', 'BTC', 'ZRX'], logger);
    expect(result).to.deep.include({ETH: {}, BTC: {}, ZRX: {}});
  });

  it('gets earnings date', async () => {
    nock(/iexcloud\.test/)
      .get(/.*/)
      .reply(200,
        '2020-09-28'
      );

    const service = new IexCloudService('http://iexcloud.test', 2);
    const result = await service.getEarningsDate('AAPL');
    expect(result).to.deep.eq(new Date('2020-09-28'));
  });

  it('gets eps for stock', async () => {
    nock(/iexcloud\.test/)
      .get(/.*/)
      .reply(200,
        '5'
      );

    const service = new IexCloudService('http://iexcloud.test', 2);
    const result = await service.getEps('AAPL');
    expect(result).to.deep.eq(5);
  });
});
