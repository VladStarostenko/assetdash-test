export const seed = async function (knex) {
  return knex('assets').whereIn('ticker', ['GOOG', 'BRK.A']).del();
};
