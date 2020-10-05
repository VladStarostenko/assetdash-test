import {expect} from 'chai';
import {formatMarketcap, formatPrice, addSeparators, formatEps, formatEarningsDate} from '../../src/core/formatters';

describe('Formatters', () => {
  it('format marketcap', () => {
    const marketcap = 1110.000000000000000000;
    expect(formatMarketcap(marketcap)).to.eq('1,110');
  });

  it('format price', () => {
    expect(formatPrice(1110.000000000000000000)).to.eq('1,110.00');
    expect(formatPrice(1.100000000000000000)).to.eq('1.100000');
    expect(formatPrice(0.990000000000000000)).to.eq('0.990000');
  });

  it('add thousands separator', () => {
    expect(addSeparators('1111111')).to.eq('1,111,111');
    expect(addSeparators('-1111')).to.eq('-1,111');
  });

  it('format EPS', () => {
    expect(formatEps(1110.000000000000000000)).to.eq('$1,110.00');
    expect(formatEps(1.100000000000000000)).to.eq('$1.10');
    expect(formatEps(0.990000000000000000)).to.eq('$0.99');
  });

  it('format earnings date', () => {
    expect(formatEarningsDate(new Date('10-11-2000'))).to.eq('Oct 11');
  });
});
