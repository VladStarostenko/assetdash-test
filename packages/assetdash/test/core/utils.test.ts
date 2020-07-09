import {expect} from 'chai';
import {cryptoDataToCryptoPricingData, stocksAndETFsDataToStocksAndETFsPricingData} from '../../src/core/utils';
import {cryptoAssetData, stockAssetData} from './utils';

describe('Utils', () => {
  it('stocksAndETFsDataToStocksAndETFsPricingData', () => {
    expect(stocksAndETFsDataToStocksAndETFsPricingData(stockAssetData)).to.deep.eq(
      {
        ticker: 'AAPL',
        price: 381.37,
        marketcap: 1652987245800,
        change: 2.329
      });
  });

  it('cryptoDataToCryptoPricingData', () => {
    expect(cryptoDataToCryptoPricingData(cryptoAssetData)).to.deep.eq(
      {
        ticker: 'ETH',
        price: 246.853296483,
        marketcap: 27570058643.874947,
        change: 1.36279
      });
  });
});
