import Knex from 'knex';
import {Asset} from '../../../core/models/asset';
import {ResourceNotFound} from '../../../core/errors';
import {ensure} from '../../../core/utils';
import {AssetPricingData} from '../../../core/models/assetPricingData';
import {AssetType} from '../../../core/models/assetType';
import {AssetTicker} from '../../../core/models/assetTicker';

export class AssetRepository {
  constructor(private db: Knex) {}

  async insertAsset(asset: Asset) {
    return this.db('assets').insert(asset);
  }

  async insertAssets(assets: Asset[]) {
    return this.db('assets').insert(assets);
  }

  async findAll(): Promise<Asset[]> {
    return this.db('assets').orderBy('currentMarketcap', 'desc').select();
  }

  async findPage(currentPage: number, perPage: number) {
    return this.db('assets')
      .join('ranks', 'assets.id', 'ranks.assetId')
      .select('assets.*', 'ranks.position as rank')
      .orderBy('currentMarketcap', 'desc')
      .paginate({perPage, currentPage, isLengthAware: true});
  }

  async findById(id: number): Promise<Asset> {
    const asset = this.db('assets').where({
      id
    }).first();
    ensure(asset !== undefined, ResourceNotFound, 'asset', id);
    return asset;
  }

  async findByIdWithRank(id: number, date: Date): Promise<Asset> {
    const asset = this.db('assets')
      .join('ranks', 'assets.id', 'ranks.assetId')
      .select('assets.*', 'ranks.position as rank')
      .where({assetId: id})
      .andWhere({date: date}).first();
    ensure(asset !== undefined, ResourceNotFound, 'asset', id);
    return asset;
  }

  async findByIds(ids: number[]): Promise<Asset[]> {
    return this.db('assets').where('id', 'in', ids);
  }

  async findByTags(tags: string[], currentPage: number, perPage: number) {
    return this.db('assets')
      .join('assets_tags', 'assets.id', 'assets_tags.assetId')
      .join('tags', function () {
        this.on('assets_tags.tagId', '=', 'tags.id').onIn('tags.name', tags);
      })
      .join('ranks', 'assets.id', 'ranks.assetId')
      .distinct('assets.*', 'ranks.position as rank')
      .orderBy('currentMarketcap', 'desc')
      .select('assets.*')
      .paginate({perPage, currentPage, isLengthAware: true});
  }

  async updatePrice(assetPrice: AssetPricingData) {
    return this.db('assets')
      .where('ticker', assetPrice.ticker)
      .andWhere('type', 'in', assetPrice.type)
      .update({
        currentPrice: assetPrice.price,
        currentMarketcap: assetPrice.marketcap,
        currentChange: assetPrice.change
      });
  }

  async getTickers(type: AssetType): Promise<AssetTicker[]> {
    return this.db('assets')
      .select('ticker')
      .where('type', type);
  }

  async findByNameOrTickerPart(nameOrTickerPart: string): Promise<Asset[]> {
    return this.db('assets')
      .orderBy('currentMarketcap', 'desc')
      .join('ranks', 'assets.id', 'ranks.assetId')
      .select('assets.*', 'ranks.position as rank')
      .where('name', 'ilike', `%${nameOrTickerPart}%`)
      .orWhere('ticker', 'ilike', `%${nameOrTickerPart}%`);
  }
}
