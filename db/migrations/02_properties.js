exports.up = function(knex, Promise) {
  return knex.schema.createTable("properties", function(tbl) {
    tbl.increments();
    tbl
      .string("address")
      .notNullable()
      .unique("addess");
    tbl.integer("bedrooms").notNullable();
    tbl.integer("bathrooms").notNullable();
    tbl.integer("max_occupants").notNullable();
    tbl.integer("square_footage").notNullable();
    tbl.integer("year_built").notNullable();
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("properties");
};
