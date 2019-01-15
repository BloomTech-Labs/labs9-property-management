exports.up = function(knex, Promise) {
  return knex.schema.createTable("work_orders", function(tbl) {
    tbl.increments("work_order_id").primary();
    tbl.string("address").notNullable();
    tbl.string("description", 500).notNullable();
    tbl.boolean("property_access").defaultTo(false);
    tbl.boolean("submitted").defaultTo(false);
    tbl.boolean("in_progress").defaultTo(false);
    tbl.boolean("completed").defaultTo(false);
    tbl.string("work_order_image", 250);
    tbl
      .integer("tenant_id")
      .unsigned()
      .notNullable()
      .references("tenant_id")
      .inTable("tenants");
    tbl
      .integer("house_id")
      .unsigned()
      .notNullable()
      .references("house_id")
      .inTable("house_properties");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("work_orders");
};
