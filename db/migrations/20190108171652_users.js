
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
      tbl.increments();
      tbl.string('firstname', 64)
        .notNullable();
      tbl.string('middlename', 64);
      tbl.string('lastname', 64)
        .notNullable();
      tbl.string('usertype', 24)
        .notNullable();
      tbl.string('email', 64)
        .notNullable()
        .unique('email');
      tbl.integer('mobile')
        .notNullable()
        .unique('mobile');
      tbl.string('password', 128)
        .notNullable();
      tbl.boolean('gettexts')
        .defaultTo(false);
      tbl.boolean('getemails')
        .defaultTo(false);
      tbl.integer('cc');
      tbl.integer('expiration');
      tbl.integer('cvv');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
