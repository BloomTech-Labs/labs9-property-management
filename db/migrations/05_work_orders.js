exports.up = function(knex, Promise) {
  return knex.schema.createTable('work_orders', function(tbl) {
    tbl.increments('work_order_id');
    tbl.string('description', 500).notNullable();
    tbl.boolean('property_access').defaultTo(false);
    tbl.string('work_order_status');
    tbl.string('work_order_image', 250);
    tbl
      .integer('tenant_id')
      .unsigned()
      .references('tenant_id')
      .inTable('tenants');
    tbl
      .integer('house_id')
      .unsigned()
      .references('house_id')
      .inTable('house_properties');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('work_orders');
};
