exports.up = async (knex) => {
  await knex.schema
    .alterTable('assets', (table) => {
      table.decimal('eps', 36, 18).defaultTo(null);
    });
};

exports.down = async (knex) => {
  await knex.schema
    .alterTable('assets', (table) => {
      table.dropColumn('eps');
    });
};
