import {endOfDay, startOfDay} from 'date-fns';
import Knex from 'knex';
import {Rank} from '../../../core/models/rank';

export class RanksRepository {
  constructor(private db: Knex) {
  }

  async updateRank(rank: Rank) {
    const isOpen = await this.findOpenFor(rank.date, rank.assetId) === undefined;
    const possibleRecent = await this.findNotOpen(rank.date, rank.assetId);
    if (isOpen || (possibleRecent?.id === undefined)) {
      return this.db('ranks').insert({...rank, isOpen});
    } else {
      return this.db('ranks').where('id', possibleRecent.id).update({...rank, isOpen});
    }
  }

  async findOpenFor(date: Date, assetId: number): Promise<Rank> {
    return this.db('ranks')
      .where('assetId', assetId)
      .where('isOpen', true)
      .whereBetween('date', [startOfDay(date), endOfDay(date)])
      .first();
  }

  async findMostRecentFor(date: Date, assetId: number): Promise<Rank> {
    return await this.findNotOpen(date, assetId) || this.findOpenFor(date, assetId);
  }

  private async findNotOpen(date: Date, assetId: number): Promise<Rank> {
    return this.db('ranks')
      .where('assetId', assetId)
      .where('isOpen', false)
      .whereBetween('date', [startOfDay(date), endOfDay(date)])
      .first();
  }
}
