import {expect} from 'chai';
import {formatISO, getHours, set, subDays} from 'date-fns';
import {utcToZonedTime} from 'date-fns-tz';
import {estDate, parseAsEstDate} from '../../src/core/utils';

function findLastsDailyResetTime(date: Date): Date {
  console.log(date.toUTCString());
  const dateInEst = utcToZonedTime(date, 'America/New York', {timeZone: 'UTC'});
  console.log(dateInEst.toUTCString());
  let dailyResetInEst = set(dateInEst, {hours: 9, minutes: 0, seconds: 0, milliseconds: 0});
  if (dateInEst.getHours() <= 9) {
    dailyResetInEst = subDays(dailyResetInEst, 1);
  }
  const result = estDate(dailyResetInEst);
  console.log(getHours(result));
  return result;
}

// 6    7    8   9 10 11 12
// 9wcz 9wcz     9 9  9  9

// 6 7 8 9  10 11
// 9 9 9 9j 9j 9j

function findNextDailyResetTime(date: Date) {

}

describe('dates', () => {
  it('converts to EST', () => {
    const _10amInNewYorkInUTC = parseAsEstDate('2020-07-27 10:00');
    expect(_10amInNewYorkInUTC.getTime()).to.eq(1595858400000);
  });

  it('finds last daily reset time', () => {
    const dailyResetTime = parseAsEstDate('2020-07-27 09:00');

    const date = parseAsEstDate('2020-07-27 19:00');
    expect(findLastsDailyResetTime(date)).to.eql(dailyResetTime);
  });

  it('finds last daily reset time before 9 ', () => {
    const dailyResetTime = parseAsEstDate('2020-07-27 08:00');

    const date = parseAsEstDate('2020-07-26 09:00');
    expect(findLastsDailyResetTime(date)).to.eql(dailyResetTime);
  });

  it('finds next daily reset time before 9 ', () => {
    const dailyResetTime = parseAsEstDate('2020-07-27 08:00');

    const date = parseAsEstDate('2020-07-27 09:00');
    expect(findNextDailyResetTime(date)).to.eql(dailyResetTime);
  });

  it('finds next daily reset time apter 9 ', () => {
    const dailyResetTime = parseAsEstDate('2020-07-27 10:00');

    const date = parseAsEstDate('2020-07-28 09:00');
    expect(findNextDailyResetTime(date)).to.eql(dailyResetTime);
  });
});
