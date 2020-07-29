exports.up = async (knex) => {
  await knex.schema
    .alterTable('assets', (table) => {
      table.timestamp('lastUpdated').notNullable().defaultTo('2020-01-01Z');
    });
};

exports.down = async (knex) => {
  await knex.schema
    .alterTable('assets', (table) => {
      table.dropColumn('lastUpdated');
    });
};
