import {expect} from 'chai';
import {formatMarketcap, formatPrice, addSeparators} from '../../src/core/utils';

describe('Utils', () => {
  it('format marketcap', () => {
    const marketcap = 10.000000000000000000;
    expect(formatMarketcap(marketcap)).to.eq('10');
  });

  it('format price', () => {
    expect(formatPrice(10.000000000000000000)).to.eq('10.00');
    expect(formatPrice(1.100000000000000000)).to.eq('1.100000');
    expect(formatPrice(0.990000000000000000)).to.eq('0.990000');
  });

  it('add thousands separator', () => {
    expect(addSeparators('1111111.1111111')).to.eq('1,111,111.1,111,111');
    expect(addSeparators('-1111.1111')).to.eq('-1,111.1,111');
  });
});
