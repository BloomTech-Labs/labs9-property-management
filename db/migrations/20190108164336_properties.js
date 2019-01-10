exports.up = function(knex, Promise) {
  return knex.schema.createTable('properties', function(tbl) {
    tbl.increments();
    tbl.string('address', 128).notNullable();
    tbl.integer('bedrooms', 64).notNullable();
    tbl.integer('bathrooms', 64).notNullable();
    tbl.integer('max_occupants', 64).notNullable();
    tbl.integer('square_footage', 64).notNullable();
    tbl.integer('year_built', 64).notNullable();
    tbl
      .integer('owner_id')
      .references('id')
      .inTable('users')
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('properties');
};
