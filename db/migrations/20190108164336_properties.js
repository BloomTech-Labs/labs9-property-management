
exports.up = function(knex, Promise) {
  return knex.schema.createTable('properties', function(tbl) {
      tbl.increments();
      tbl.string('ownerfirstname', 64)
      .notNullable();
      tbl.string('ownerlastname', 64)
      .notNullable();
      tbl.integer('ownermobile')
      .notNullable()
      .unique('ownermobile');
      tbl.string('owneremail', 64)
      .notNullable()
      .unique('owneremail');
      tbl.string('owneraddress', 128)
      .notNullable();
      tbl.string('propertyaddress', 128)
      .notNullable();
      tbl.integer('propertybedrooms', 64)
      .notNullable();
      tbl.integer('propertybadrooms', 64)
      .notNullable();
      tbl.integer('maxoccupants', 64)
      .notNullable();
      tbl.integer('squarefootage', 64)
      .notNullable();
      tbl.integer('yearbuilt', 64)
      .notNullable();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('properties');
};
