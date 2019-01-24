exports.up = function(knex, Promise) {
  return knex.schema.createTable('owners', function(tbl) {
    tbl.increments('owner_id').unique();
    tbl
      .string('owner_uid')
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
