import Knex from 'knex';
import {Rank} from '../../../core/models/rank';

export class RanksRepository {
  constructor(private db: Knex) {
  }

  async insertRank(rank: Rank) {
    return this.db('ranks').insert(rank);
  }

  async insertRanks(ranks: Rank[]) {
    return this.db('ranks').insert(ranks);
  }

  async updateRank(rank: Rank) {
    return this.db('ranks')
      .where('assetId', rank.assetId)
      .andWhere('date', rank.date)
      .update({
        position: rank.position
      });
  }
}
