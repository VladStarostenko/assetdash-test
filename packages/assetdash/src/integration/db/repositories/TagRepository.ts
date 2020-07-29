import Knex from 'knex';
import {AssetsTags} from '../../../core/models/assetsTags';
import {Tag} from '../../../core/models/tag';

export class TagRepository {
  constructor(private db: Knex) {
  }

  async insertTags(tags: Tag[]) {
    return this.db('tags').insert(tags);
  }

  async insertAssetsTags(assetsTags: AssetsTags[]) {
    return this.db('assets_tags').insert(assetsTags);
  }
}
