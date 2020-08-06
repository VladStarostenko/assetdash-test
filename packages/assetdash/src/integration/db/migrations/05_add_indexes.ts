exports.up = async (knex) => {
  await knex.schema
    .alterTable('ranks', (table) => {
      table.index('assetId', 'idx_ranks_assetId');
    });
};

exports.down = async (knex) => {
  await knex.schema
    .alterTable('ranks', (table) => {
      table.dropIndex('ranks', 'idx_ranks_assetId');
    });
};
