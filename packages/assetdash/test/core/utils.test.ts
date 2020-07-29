import {expect} from 'chai';
import {cryptoDataToCryptoPricingData, stocksAndETFsDataToStocksAndETFsPricingData} from '../../src/core/utils';
import {cryptoAssetData, stockAssetData} from '../helpers/fixtures';
import {parseISO} from 'date-fns';

describe('Utils', () => {
  it('stocksAndETFsDataToStocksAndETFsPricingData', () => {
    expect(stocksAndETFsDataToStocksAndETFsPricingData(stockAssetData)).to.deep.eq(
      {
        ticker: 'AAPL',
        price: 381.37,
        marketcap: 1652987245800,
        change: 2.329,
        type: ['Stock', 'ETF'],
        lastUpdated: new Date(1594238400513)
      });
  });

  it('cryptoDataToCryptoPricingData', () => {
    expect(cryptoDataToCryptoPricingData(cryptoAssetData)).to.deep.eq(
      {
        ticker: 'ETH',
        price: 246.853296483,
        marketcap: 27570058643.874947,
        change: 1.36279,
        type: ['Cryptocurrency'],
        lastUpdated: parseISO('2020-07-09T13:03:30.000Z')
      });
  });
});
