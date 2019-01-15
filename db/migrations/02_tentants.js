exports.up = function(knex, Promise) {
  return knex.schema.createTable("tenants", function(tbl) {
    tbl
      .increments("tenant_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users");
    tbl.boolean("get_texts").defaultTo(false);
    tbl.boolean("get_emails").defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("tenants");
};
