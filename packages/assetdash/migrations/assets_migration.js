exports.up = async (knex) => {
  await knex.schema
    .createTable('assets', (table) => {
      table.increments('id').primary();
      table.string('ticker').notNullable();
      table.string('name').notNullable();
      table.string('image_url').notNullable();
      table.decimal('current_price', 36, 18).notNullable();
      table.integer('current_marketcap').notNullable();
      table.integer('current_change').notNullable();
      table.string('type').notNullable();
      table.integer('dash_daily').notNullable();
      table.integer('dash_weekly').notNullable();
      table.integer('dash_monthly').notNullable();
      table.integer('dash_quarterly').notNullable();
    })
    .createTable('ranks', (table) => {
      table.increments('id').primary();
      table.integer('asset_id').references('id').inTable('assets').notNullable();
      table.timestamp('date').notNullable();
      table.integer('position').notNullable();
    })
    .createTable('tags', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('image_url').notNullable();
    })
    .createTable('assets_tags', (table) => {
      table.increments('id').primary();
      table.integer('tag_id').references('id').inTable('tags').notNullable();
      table.integer('asset_id').references('id').inTable('assets').notNullable();
    });
};

exports.down = async (knex) => {
  await knex.schema
    .dropTable('assets_tags')
    .dropTable('tags')
    .dropTable('ranks')
    .dropTable('assets');
};
