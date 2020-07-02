import Knex from 'knex';
import {Asset} from '../../../core/models/asset';
import {ResourceNotFound} from '../../../core/errors';
import {ensure} from '../../../core/utils';
import {AssetPricingData} from '../../../core/models/assetPricingData';

export class AssetRepository {
  constructor(private db: Knex) {}

  async insertAsset(asset: object) {
    return this.db('assets').insert(asset);
  }

  async findAll(): Promise<Asset[]> {
    return this.db('assets').select();
  }

  async findById(id: number): Promise<Asset> {
    const asset = this.db('assets').where({
      id
    }).first();
    ensure(asset !== undefined, ResourceNotFound, 'asset', id);
    return asset;
  }

  async updatePrice(assetPrice: AssetPricingData) {
    return this.db('assets')
      .where({ticker: assetPrice.ticker})
      .update({
        currentPrice: assetPrice.price,
        currentMarketcap: assetPrice.marketcap
      });
  }

  async updatePrices(assetPrices: AssetPricingData[]) {
    for (const assetPrice of assetPrices) {
      await this.updatePrice(assetPrice);
    }
  }
}
