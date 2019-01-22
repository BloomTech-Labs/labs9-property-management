exports.up = function(knex, Promise) {
  return knex.schema.createTable('credit_cards', function(tbl) {
    tbl.increments('card_id');
    tbl
      .integer('user_id')
      .unsigned()
      .references('user_id')
      .inTable('users');
    tbl.string('stripe_token', 250);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('credit_cards');
};
