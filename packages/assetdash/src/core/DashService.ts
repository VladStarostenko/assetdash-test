import {startOfMonth, startOfWeek} from 'date-fns';
import {RanksRepository} from '../integration/db/repositories/RanksRepository';

export class DashService {
  constructor(private ranksRepository: RanksRepository) {

  }

  async dailyDash(now: Date, assetId: number) {
    const open = await this.ranksRepository.findOpenFor(now, assetId);
    const current = await this.ranksRepository.findMostRecentFor(now, assetId);
    return open?.position - current?.position || 0;
  }

  async weeklyDash(now: Date, assetId: number) {
    const open = await this.ranksRepository.findOpenFor(startOfWeek(now, {weekStartsOn: 1}), assetId);
    const current = await this.ranksRepository.findMostRecentFor(now, assetId);
    return open?.position - current?.position || 0;
  }

  async monthlyDash(now: Date, assetId: number) {
    const open = await this.ranksRepository.findOpenFor(startOfMonth(now), assetId);
    const current = await this.ranksRepository.findMostRecentFor(now, assetId);
    return open?.position - current?.position || 0;
  }
}
