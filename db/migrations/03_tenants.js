exports.up = function(knex, Promise) {
  return knex.schema.createTable('tenants', function(tbl) {
    tbl.increments();
    tbl
      .string('tenant_uid')
      .unique()
      .references('uid')
      .inTable('users');
    tbl.boolean('get_texts').defaultTo(false);
    tbl.boolean('get_emails').defaultTo(false);
    tbl.string('leased_start_date', 64);
    tbl.string('end_date', 64);
    tbl
      .integer('house_id')
      .unsigned()
      .references('house_id')
      .inTable('house_properties');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tenants');
};
