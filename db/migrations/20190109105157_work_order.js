exports.up = function(knex, Promise) {
  return knex.schema.createTable('work_orders', function(tbl) {
    tbl.increments();
    tbl.string('address').notNullable();
    tbl.string('description').notNullable();
    tbl.boolean('permission').defaultTo(false);
    tbl.integer('tenant_mobile').notNullable();
    tbl.boolean('submitted').defaultTo(false);
    tbl.boolean('inprogress').defaultTo(false);
    tbl.boolean('completed').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('work_orders');
};
