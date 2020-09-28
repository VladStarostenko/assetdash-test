exports.up = async (knex) => {
  await knex.schema
    .alterTable('assets', (table) => {
      table.decimal('eps', 36, 18).notNullable().defaultTo(0);
    });
};

exports.down = async (knex) => {
  await knex.schema
    .alterTable('assets', (table) => {
      table.dropColumn('eps');
    });
};
