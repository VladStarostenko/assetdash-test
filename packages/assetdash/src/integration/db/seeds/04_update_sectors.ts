import {tagIdOf} from '../utils';

export const seed = async function (knex) {
  const idsOfAssetsFromGoldToHealth =
    (await knex('assets').select('id').whereIn('ticker', ['PG', 'NVO', 'TXG']))
      .map(id => id.id);
  await knex('assets_tags').whereIn('assetId', idsOfAssetsFromGoldToHealth)
    .andWhere('tagId', tagIdOf('Gold')).update({tagId: tagIdOf('Health')});

  const idsOfAssetsRemoveFromGold =
    (await knex('assets').select('id').whereIn('ticker', ['RSG', 'PRU', 'CG']))
      .map(id => id.id);
  await knex('assets_tags').whereIn('assetId', idsOfAssetsRemoveFromGold)
    .andWhere('tagId', tagIdOf('Gold')).del();

  const idOfAssetRemoveFromHospitality =
    (await knex('assets').select('id').where('ticker', '=', 'MDT'))
      .map(id => id.id);
  await knex('assets_tags').whereIn('assetId', idOfAssetRemoveFromHospitality)
    .andWhere('tagId', tagIdOf('Hospitality')).del();

  const idsOfAssetsAddToCars =
    (await knex('assets').select('id').whereIn('ticker', ['BMWYY', 'VWAGY']))
      .map(id => id.id);
  for (const id of idsOfAssetsAddToCars) {
    await knex('assets_tags').insert({assetId: id, tagId: tagIdOf('Cars')});
  }
};
