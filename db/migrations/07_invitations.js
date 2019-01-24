exports.up = function(knex, Promise) {
  return knex.schema.createTable('tenants', function(tbl) {
    tbl.increments('id');
    tbl
      .string('tenant_uid')
      .unique()
      .references('tenant_uid')
      .inTable('tenants');
    tbl.string('owner_uid');
    tbl.string('lease_start_date', 64);
    tbl.string('lease_end_date', 64);
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
