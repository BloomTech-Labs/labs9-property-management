exports.up = function(knex, Promise) {
  return knex.schema.createTable('house_properties', function(tbl) {
    tbl.increments('house_id');
    tbl.string('property_name', 250);
    tbl.string('address').notNullable();
    tbl.string('city').notNullable();
    tbl.string('state').notNullable();
    tbl.string('zip_code').notNullable();
    tbl.integer('bedrooms').notNullable();
    tbl.integer('bathrooms').notNullable();
    tbl.integer('max_occupants').notNullable();
    tbl.integer('square_footage').notNullable();
    tbl.integer('year_built').notNullable();
    tbl.string('house_image_url', 250);
    tbl.integer('office_ph');
    tbl.integer('maintenance_ph');
    tbl
      .integer('owner_id')
      .references('owner_id')
      .inTable('owners');
    tbl
      .string('owner_uid')
      .references('owner_uid')
      .inTable('owners');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('house_properties');
};
