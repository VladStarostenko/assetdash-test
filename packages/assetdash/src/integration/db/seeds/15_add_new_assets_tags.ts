export const seed = async function (knex) {
  const assetIds = await knex('assets').select('id').where('type', 'Stock').pluck('id');
  const tagId = await knex('tags').select('id').where('name', 'Stock').pluck('id');
  const assetsWithTags = assetIds.map(assetId => ({tagId: tagId[0], assetId}));
  return knex('assets_tags').insert(assetsWithTags);
};
