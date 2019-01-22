exports.up = function(knex, Promise) {
  return knex.schema.createTable('admins', function(tbl) {
    tbl.increments();
    tbl
      .string('admin_uid')
      .unique()
      .references('uid')
      .inTable('users')
      .notNullable();
    tbl.string('stripe_user_id').unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('admins');
};
