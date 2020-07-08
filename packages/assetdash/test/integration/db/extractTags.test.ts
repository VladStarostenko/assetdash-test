import {extractTags} from '../../../src/integration/db/seeds/03_assets_tags_seed';
import {expect} from 'chai';

describe('extract tags', () => {
  it('creates asset to tag mapping', () => {
    const result = extractTags([
      ['WYNN', '"""Wynn Resorts, Limited"""',
        '', '', '', 'Hospitality', '', '', '', '', '', '', '', '', 'Gamble', '', ''],
      ['CODI', '"""Compass Diversified Holdings"""',
        '', '', '', 'Hospitality', '', '', '', '', '', '', '', '', '', 'Green', '']
    ]);
    expect(result).to.deep.eq([
      {
        assetId: 1,
        tagId: 5
      },
      {
        assetId: 1,
        tagId: 14
      },
      {
        assetId: 2,
        tagId: 5
      },
      {
        assetId: 2,
        tagId: 15
      }
    ]);
  });
});
