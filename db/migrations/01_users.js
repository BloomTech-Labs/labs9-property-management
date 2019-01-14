exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(tbl) {
    tbl.increments();
    tbl.string("first_name", 64).notNullable();
    tbl.string("middle_name", 64);
    tbl.string("last_name", 64).notNullable();
    tbl.string("display_name", 64).notNullable();
    tbl
      .string("email", 64)
      .notNullable()
      .unique("email");
    tbl
      .integer("mobile")
      .notNullable()
      .unique("mobile");
    tbl.string("password", 128).notNullable();
    tbl.boolean("admin_user").defaultTo(false);
    tbl.string("home_address").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
