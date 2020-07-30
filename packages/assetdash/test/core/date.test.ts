import {expect} from 'chai';
import {set} from 'date-fns';
import {utcToZonedTime} from 'date-fns-tz';
import {estDate, parseAsEstDate} from '../../src/core/utils';

function findDailyResetTime(date: Date): Date {
  const dateInEst = utcToZonedTime(date, 'America/New York');
  const dailyResetInEst = set(dateInEst, {hours: 9, minutes: 0, seconds: 0, milliseconds: 0});
  return estDate(dailyResetInEst);
}

describe('dates', () => {
  it('converts to EST', () => {
    const _10amInNewYorkInUTC = parseAsEstDate('2020-07-27 10:00');
    expect(_10amInNewYorkInUTC.getTime()).to.eq(1595858400000);
  });

  it('finds reset time', () => {
    const dailyResetTime = parseAsEstDate('2020-07-27 09:00');

    const date = parseAsEstDate('2020-07-27 19:00');
    expect(date.getTime()).to.eq(1595890800000);
    expect(findDailyResetTime(date)).to.eql(dailyResetTime);
    expect(date.getTime()).to.eq(1595890800000);
  });
});
