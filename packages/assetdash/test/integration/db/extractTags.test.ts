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
        assetId: 52,
        tagId: 5
      },
      {
        assetId: 52,
        tagId: 14
      },
      {
        assetId: 53,
        tagId: 5
      },
      {
        assetId: 53,
        tagId: 15
      }
    ]);
  });
});
