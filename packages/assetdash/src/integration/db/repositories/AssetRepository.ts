import Knex from 'knex';
import {ResourceNotFound} from '../../../core/errors';
import {Asset} from '../../../core/models/asset';
import {AssetPricingData} from '../../../core/models/assetPricingData';
import {AssetType} from '../../../core/models/assetType';
import {ensure} from '../../../core/utils';

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

  findAssetQuery() {
    const maxDate = this.db('ranks')
      .distinctOn('assetId')
      .select('position', 'assetId')
      .orderBy([{column: 'assetId'}, {column: 'date', order: 'desc'}, {column: 'isOpen', order: 'asc'}])
      .as('currentRank');
    return this.db('assets')
      .join(maxDate, 'assets.id', '=', 'currentRank.assetId')
      .select('assets.*', 'currentRank.position as rank')
      .orderBy('currentMarketcap', 'desc');
  }

  async findPage(currentPage: number, perPage: number) {
    return this.findAssetQuery().paginate({perPage, currentPage, isLengthAware: true});
  }

  async findWatchList(watchList: string) {
    return this.findAssetQuery()
      .whereIn('assets.ticker', watchList.split('-'));
  }

  async findById(id: number): Promise<Asset> {
    const asset = this.db('assets').where({
      id
    }).first();
    ensure(asset !== undefined, ResourceNotFound, 'asset', id);
    return asset;
  }

  async findByTags(tag: string, currentPage: number, perPage: number) {
    return this.findAssetQuery()
      .join('assets_tags', 'assets.id', 'assets_tags.assetId')
      .join('tags', function () {
        this.on('assets_tags.tagId', '=', 'tags.id');
      })
      .where('tags.name', tag)
      .distinct()
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

  async getTickers(type: AssetType): Promise<string[]> {
    return this.db('assets')
      .select('ticker')
      .where('type', type)
      .pluck('ticker');
  }

  async findByNameOrTickerPart(nameOrTickerPart: string): Promise<Asset[]> {
    return this.findAssetQuery()
      .where('name', 'ilike', `%${nameOrTickerPart}%`)
      .orWhere('ticker', 'ilike', `%${nameOrTickerPart}%`);
  }

  async updateDash(assetId: number, dashDaily: number, dashWeekly: number, dashMonthly: number) {
    return this.db('assets')
      .where('id', assetId)
      .update({
        dashDaily,
        dashWeekly,
        dashMonthly
      });
  }

  async updateEarningsDate(ticker: string, earningsDate: Date) {
    return this.db('assets')
      .where('ticker', ticker)
      .andWhere('type', 'Stock')
      .update({
        earningsDate
      });
  }

  async updateEps(ticker: string, eps: number) {
    return this.db('assets')
      .where('ticker', ticker)
      .andWhere('type', 'Stock')
      .update({
        eps
      });
  }
}
