exports.up = async (knex) => {
  await knex.schema
    .alterTable('assets', (table) => {
      table.timestamp('earningsDate').notNullable().defaultTo('2000-01-01Z');
    });
};

exports.down = async (knex) => {
  await knex.schema
    .alterTable('assets', (table) => {
      table.dropColumn('earningsDate');
    });
};
