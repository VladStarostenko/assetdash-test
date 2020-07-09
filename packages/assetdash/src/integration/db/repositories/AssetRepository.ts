import Knex from 'knex';
import {Asset} from '../../../core/models/asset';
import {ResourceNotFound} from '../../../core/errors';
import {ensure} from '../../../core/utils';
import {AssetPricingData} from '../../../core/models/assetPricingData';
import {AssetType} from '../../../core/models/assetType';
import {AssetTicker} from '../../../core/models/assetTicker';

export class AssetRepository {
  constructor(private db: Knex) {}

  async insertAsset(asset: object) {
    return this.db('assets').insert(asset);
  }

  async insertAssets(assets: object[]) {
    return this.db('assets').insert(assets);
  }

  async findAll(): Promise<Asset[]> {
    return this.db('assets').select();
  }

  async findPage(currentPage: number, perPage: number) {
    const paginator = await this.db('assets').orderBy('currentMarketcap', 'desc')
      .paginate({perPage, currentPage});
    paginator.data.map((asset, index) => {
      asset['rank'] = (index + 1) + (currentPage - 1) * perPage;
    });
    return paginator.data;
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
        currentMarketcap: assetPrice.marketcap,
        currentChange: assetPrice.change
      });
  }

  async updatePrices(assetPrices: AssetPricingData[]) {
    for (const assetPrice of assetPrices) {
      await this.updatePrice(assetPrice);
    }
  }

  async getTickers(type: AssetType): Promise<AssetTicker[]> {
    return this.db('assets')
      .select('ticker')
      .where('type', type);
  }
}
