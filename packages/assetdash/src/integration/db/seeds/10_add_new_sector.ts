export const seed = async function (knex) {
  return knex('tags').insert({name: 'SP500'});
};
