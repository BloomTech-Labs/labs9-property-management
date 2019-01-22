exports.up = function(knex, Promise) {
  return knex.schema.createTable('owners', function(tbl) {
    tbl.increments();
    tbl
      .string('owner_id')
      .unique()
      .references('uid')
      .inTable('users')
      .notNullable();
    tbl.string('stripe_user_id').unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('owners');
};
