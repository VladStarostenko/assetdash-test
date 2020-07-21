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
    const insert = this.db('ranks').insert(rank);
    const update = this.db.queryBuilder()
      .where('ranks.assetId', rank.assetId)
      .andWhere('ranks.date', rank.date)
      .update({
        position: rank.position
      });
    return this.db.raw('? ON CONFLICT ("assetId", "date") DO ? returning *', [insert, update]);
  }
}
