exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    tbl.increments('user_id').unique();
    tbl.string('first_name', 64).notNullable();
    tbl.string('middle_name', 64);
    tbl.string('last_name', 64).notNullable();
    tbl.string('username', 64).notNullable();
    tbl
      .string('email', 64)
      .notNullable()
      .unique('email');
    tbl
      .integer('mobile')
      .notNullable()
      .unique('mobile');
    tbl.string('password', 250).notNullable();
    tbl.string('home_address').notNullable();
    tbl.string('profile_pic_url', 250);
    tbl.string('recovery_token', 250);
    tbl.boolean('is_admin').defaultTo(false);
    tbl.string('role', 64);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
