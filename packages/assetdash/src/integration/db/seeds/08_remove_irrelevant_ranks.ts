export const seed = async function (knex) {
  const idsOfAssetsRemove =
    await knex('assets').select('id').whereIn('ticker', ['GOOG', 'BRK.A']).pluck('id');
  return knex('ranks').whereIn('assetId', idsOfAssetsRemove).del();
};
