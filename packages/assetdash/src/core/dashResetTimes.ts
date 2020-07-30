import {DateTime} from 'luxon';

export function findLastsDailyResetTime(date: Date): Date {
  const utcDate = DateTime.fromJSDate(date);
  const nyDate = utcDate.setZone('America/New_York');
  const result = nyDate.set({hour: 9, minute: 0, second: 0, millisecond: 0});
  if (nyDate.hour < 9) {
    return result.minus({days: 1}).toUTC().toJSDate();
  }
  return result.toUTC().toJSDate();
}

export function findNextDailyResetTime(date: Date) {
  const utcDate = DateTime.fromJSDate(date);
  const nyDate = utcDate.setZone('America/New_York');
  nyDate.startOf('month');
  const result = nyDate.set({hour: 9, minute: 0, second: 0, millisecond: 0});
  if (nyDate.hour >= 9) {
    return result.plus({days: 1}).toUTC().toJSDate();
  }
  return result.toUTC().toJSDate();
}
