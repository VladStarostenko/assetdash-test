import {addTagsForAssets} from '../../../src/integration/db/utils';
import {expect} from 'chai';

describe('extract tags', () => {
  it('creates asset to tag mapping', () => {
    const result = addTagsForAssets([
      ['WYNN', '"""Wynn Resorts, Limited"""',
        '', '', '', 'Hospitality', '', '', '', '', '', '', '', '', 'Gamble', '', ''],
      ['CODI', '"""Compass Diversified Holdings"""',
        '', '', '', 'Hospitality', '', '', '', '', '', '', '', '', '', 'Green', '']
    ], 51);
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
