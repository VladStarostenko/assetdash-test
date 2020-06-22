import Knex from 'knex';
import {Asset} from '../models/asset';
import {ResourceNotFound} from '../errors';
import {ensure} from '../utils';

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
