exports.up = function(knex, Promise) {
  return knex.schema.createTable('owners', function(tbl) {
    tbl.increments('owner_id');
    tbl
      .string('owner_uid')
      .references('uid')
      .inTable('users')
      .notNullable();
    tbl.string('stripe_user_id').unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('owners');
};
