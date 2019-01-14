exports.up = function(knex, Promise) {
  return knex.schema.createTable("work_orders", function(tbl) {
    tbl.increments();
    tbl.string("address").notNullable();
    tbl.string("description").notNullable();
    tbl.boolean("property_access").defaultTo(false);
    tbl.boolean("submitted").defaultTo(false);
    tbl.boolean("in_progresss").defaultTo(false);
    tbl.boolean("completed").defaultTo(false);
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    tbl
      .integer("tenant_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("tenants");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("work_orders");
};
