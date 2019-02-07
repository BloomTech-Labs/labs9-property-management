exports.up = function(knex, Promise) {
  return knex.schema.createTable('alerts', function(tbl) {
    tbl.increments('id');
    tbl
      .string('uid')
      .unique()
      .references('uid')
      .inTable('users');
    tbl.string('type');
    tbl.string('date', 64);
    tbl.string('message', 64);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('alerts');
};
