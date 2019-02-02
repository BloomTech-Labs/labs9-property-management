exports.up = function(knex, Promise) {
  return knex.schema.createTable('house_properties', function(tbl) {
    tbl.increments('house_id').unique();
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
    tbl.string('office_ph', 64);
    tbl.string('maintenance_ph', 64);
    tbl
      .string('owner_uid')
      .references('owner_uid')
      .inTable('owners');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('house_properties');
};
