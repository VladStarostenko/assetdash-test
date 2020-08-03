import {expect} from 'chai';
import {DateTime} from 'luxon';
import {
  findLastDailyResetTime,
  findMonthlyDashResetTime,
  findNextDailyResetTime,
  findWeeklyDashResetTime,
  isStocksDashUpdateTime
} from '../../src/core/dashResetTimes';
import {parseAsEstDate} from '../../src/core/utils';

describe('reset times', () => {
  it('converts to EST', () => {
    const _10amInNewYorkInUTC = parseAsEstDate('2020-07-27 10:00');
    expect(_10amInNewYorkInUTC.getTime()).to.eq(1595858400000);
  });

  it('finds last daily reset time', () => {
    expect(findLastDailyResetTime(parseAsEstDate('2020-07-27 19:00')))
      .to.eql(parseAsEstDate('2020-07-27 09:00'));
  });

  it('finds last daily reset time before 9 ', () => {
    expect(findLastDailyResetTime(parseAsEstDate('2020-07-27 08:00')))
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

describe('update times', () => {
  const formatInEst = (date: Date) => DateTime.fromJSDate(date, {zone: 'America/New_York'})
    .toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS);

  [
    {date: parseAsEstDate('2020-05-11 08:59:59'), isUpdateTime: false},
    {date: parseAsEstDate('2020-05-11 09:00:00'), isUpdateTime: true},
    {date: parseAsEstDate('2020-05-11 15:59:59'), isUpdateTime: true},
    {date: parseAsEstDate('2020-05-11 16:00:00'), isUpdateTime: false},
    {date: parseAsEstDate('2020-05-11 16:00:01'), isUpdateTime: false},
    {date: parseAsEstDate('2020-05-11 11:00:00'), isUpdateTime: true},
    {date: parseAsEstDate('2020-05-12 11:00:00'), isUpdateTime: true},
    {date: parseAsEstDate('2020-05-13 11:00:00'), isUpdateTime: true},
    {date: parseAsEstDate('2020-05-14 11:00:00'), isUpdateTime: true},
    {date: parseAsEstDate('2020-05-15 11:00:00'), isUpdateTime: true},
    {date: parseAsEstDate('2020-05-16 09:01:00'), isUpdateTime: false},
    {date: parseAsEstDate('2020-05-16 16:01:00'), isUpdateTime: false},
    {date: parseAsEstDate('2020-05-16 18:00:00'), isUpdateTime: false},
    {date: parseAsEstDate('2020-05-17 12:01:00'), isUpdateTime: false}
  ].forEach(({date, isUpdateTime}) => {
    it(`${formatInEst(date)} - ${isUpdateTime ? 'yes' : 'no'}`, () => {
      expect(isStocksDashUpdateTime(date)).to.eql(isUpdateTime);
    });
  });
});

// Mo Tu We Th Fr Sa Su
//              1  2  3
//  4  5  6  7  8  9 10
// 11 12 13 14 15 16 17
// 18 19 20 21 22 23 24
// 25 26 27 28 29 30 31
