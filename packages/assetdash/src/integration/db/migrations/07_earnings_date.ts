exports.up = async (knex) => {
  await knex.schema
    .alterTable('assets', (table) => {
      table.timestamp('earningsDate').defaultTo(null);
    });
};

exports.down = async (knex) => {
  await knex.schema
    .alterTable('assets', (table) => {
      table.dropColumn('earningsDate');
    });
};
