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

  async findByTagIds(tagIds: number[]) {
    return this.db('assets_tags').select('assetId').where('tagId', 'in', tagIds);
  }

  async getTagsIds(sectors: string[]) {
    return this.db('tags').select('id').where('name', 'in', sectors);
  }
}
