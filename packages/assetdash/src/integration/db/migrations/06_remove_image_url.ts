exports.up = async (knex) => {
  await knex.schema
    .alterTable('assets', (table) => {
      table.dropColumn('imageUrl');
    });
};

exports.down = async (knex) => {
  await knex.schema
    .alterTable('assets', (table) => {
      table.string('imageUrl').notNullable();
    });
};
