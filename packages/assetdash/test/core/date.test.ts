import {expect} from 'chai';
import {findLastsDailyResetTime,
  findMonthlyDashResetTime,
  findNextDailyResetTime,
  findWeeklyDashResetTime} from '../../src/core/dashResetTimes';
import {parseAsEstDate} from '../../src/core/utils';

describe('dates', () => {
  it('converts to EST', () => {
    const _10amInNewYorkInUTC = parseAsEstDate('2020-07-27 10:00');
    expect(_10amInNewYorkInUTC.getTime()).to.eq(1595858400000);
  });

  it('finds last daily reset time', () => {
    expect(findLastsDailyResetTime(parseAsEstDate('2020-07-27 19:00')))
      .to.eql(parseAsEstDate('2020-07-27 09:00'));
  });

  it('finds last daily reset time before 9 ', () => {
    expect(findLastsDailyResetTime(parseAsEstDate('2020-07-27 08:00')))
      .to.eql(parseAsEstDate('2020-07-26 09:00'));
  });

  it('finds next daily reset time before 9 ', () => {
    expect(findNextDailyResetTime(parseAsEstDate('2020-07-27 08:00')))
      .to.eql(parseAsEstDate('2020-07-27 09:00'));
  });

  it('finds next daily reset time after 9 ', () => {
    expect(findNextDailyResetTime(parseAsEstDate('2020-07-27 10:00')))
      .to.eql(parseAsEstDate('2020-07-28 09:00'));
  });

  it('finds monthly dash reset time', () => {
    expect(findMonthlyDashResetTime(parseAsEstDate('2020-05-15 12:41')))
      .to.eql(parseAsEstDate('2020-04-30 23:59'));
  });

  it('finds weekly dash reset time', () => {
    expect(findWeeklyDashResetTime(parseAsEstDate('2020-05-15 12:41')))
      .to.eql(parseAsEstDate('2020-05-11 09:00'));
  });
});
