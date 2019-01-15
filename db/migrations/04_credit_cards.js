exports.up = function(knex, Promise) {
  return knex.schema.createTable("credit_cards", function(tbl) {
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .primary();
    tbl.string("stripe_token", 250);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("credit_cards");
};
