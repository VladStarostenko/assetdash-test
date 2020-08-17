export const seed = async function (knex) {
  const idsOfAssetsRemove =
    (await knex('assets').select('id').whereIn('ticker', ['GOOG', 'BRK.A']))
      .map(id => id.id);
  return knex('assets_tags').whereIn('assetId', idsOfAssetsRemove).del();
};
