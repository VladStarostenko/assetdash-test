exports.up = async (knex) => {
  await knex.schema
    .createTable('assets', (table) => {
      table.increments('id').primary();
      table.string('ticker').notNullable();
      table.string('name').notNullable();
      table.string('imageUrl').notNullable();
      table.decimal('currentPrice', 36, 18).notNullable().defaultTo(0);
      table.decimal('currentMarketcap', 36, 18).notNullable().defaultTo(0);
      table.decimal('currentChange', 36, 18).notNullable().defaultTo(0);
      table.string('type').notNullable();
      table.integer('dashDaily').notNullable().defaultTo(0);
      table.integer('dashWeekly').notNullable().defaultTo(0);
      table.integer('dashMonthly').notNullable().defaultTo(0);
      table.integer('dashQuarterly').notNullable().defaultTo(0);
    })
    .createTable('ranks', (table) => {
      table.increments('id').primary();
      table.integer('assetId').references('id').inTable('assets').notNullable();
      table.timestamp('date').notNullable();
      table.integer('position').notNullable();
    })
    .createTable('tags', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('imageUrl').notNullable();
    })
    .createTable('assetsTags', (table) => {
      table.increments('id').primary();
      table.integer('tagId').references('id').inTable('tags').notNullable();
      table.integer('assetId').references('id').inTable('assets').notNullable();
    });
};

exports.down = async (knex) => {
  await knex.schema
    .dropTable('assetsTags')
    .dropTable('tags')
    .dropTable('ranks')
    .dropTable('assets');
};
