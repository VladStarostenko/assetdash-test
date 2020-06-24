import Knex from 'knex';
import {Asset} from '../../../core/models/asset';
import {ResourceNotFound} from '../../../core/errors';
import {ensure} from '../../../core/utils';

export class AssetRepository {
  constructor(private db: Knex) {}

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
}
