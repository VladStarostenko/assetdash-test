import Knex from 'knex';

export interface AssetRecord {
  id: number;
  ticker: string;
  name: string;
  image_url: string;
  current_price: number;
  current_marketcap: number;
  current_change: number;
  type: string;
  dash_daily: number;
  dash_weekly: number;
  dash_monthly: number;
  dash_quarterly: number;
}

export class AssetRepository {
  constructor(private db: Knex) {}

  async insert(
    id: number,
    ticker: string,
    name: string,
    image_url: string,
    current_price: number,
    current_marketcap: number,
    current_change: number,
    type: string,
    dash_daily: number,
    dash_weekly: number,
    dash_monthly: number,
    dash_quarterly: number
  ) {
    return this.db('assets').insert({
      id,
      ticker,
      name,
      image_url,
      current_price,
      current_marketcap,
      current_change,
      type,
      dash_daily,
      dash_weekly,
      dash_monthly,
      dash_quarterly
    });
  }

  async findById(id: number): Promise<AssetRecord | undefined> {
    return this.db('assets').where({
      id
    }).first();
  }
}
