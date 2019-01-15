exports.up = function(knex, Promise) {
  return knex.schema.createTable("house_properties", function(tbl) {
    tbl.increments("house_id").primary();
    tbl
      .string("address")
      .notNullable()
      .unique("address");
    tbl.integer("bedrooms").notNullable();
    tbl.integer("bathrooms").notNullable();
    tbl.integer("max_occupants").notNullable();
    tbl.integer("square_footage").notNullable();
    tbl.integer("year_built").notNullable();
    tbl.string("house_image_url", 250);
    tbl
      .integer("owner_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("house_properties");
};
