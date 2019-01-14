exports.up = function(knex, Promise) {
  return knex.schema.createTable("tenants", function(tbl) {
    tbl.increments();
    tbl.boolean("get_texts").defaultTo(false);
    tbl.boolean("get_emails").defaultTo(false);
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("tenants");
};
