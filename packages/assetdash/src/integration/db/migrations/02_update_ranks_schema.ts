exports.up = async (knex) => {
  await knex.schema
    .alterTable('ranks', (table) => {
      table.dropUnique(['assetId', 'date']);
      table.boolean('isOpen').notNullable().defaultTo(false);
    });
};

exports.down = async (knex) => {
  await knex.schema
    .alterTable('ranks', (table) => {
      table.dropColumn('isOpen');
      table.unique(['assetId', 'date']);
    });
};
