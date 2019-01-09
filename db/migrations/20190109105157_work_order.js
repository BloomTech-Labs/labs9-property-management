exports.up = function(knex, Promise) {
  return knex.schema.createTable("workOrders", function(tbl) {
    tbl.increments();
    tbl.string("address").notNullable();
    tbl.string("description").notNullable();
    tbl.boolean("permission").defaultTo(false);
    tbl.integer("tenantmobile").notNullable();
    tbl.boolean("submitted").defaultTo(false);
    tbl.boolean("inprogress").defaultTo(false);
    tbl.boolean("completed").defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("workOrders");
};
