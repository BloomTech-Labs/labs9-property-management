const faker = require('faker');

const createFakeProperty = () => {
  return {
    address:
      faker.address.streetAddress() +
      faker.address.city() +
      faker.address.country(),
    bedrooms: faker.random.number({
      min: 1,
      max: 6,
    }),
    bathrooms: faker.random.number({
      min: 1,
      max: 4,
    }),
    max_occupants: faker.random.number({
      min: 1,
      max: 12,
    }),
    square_footage: faker.random.number({
      min: 100,
      max: 1500,
    }),
    year_built: faker.random.number({
      min: 1940,
      max: 2019,
    }),
    owner_id: faker.random.number({
      min: 1,
      max: 3,
    }),
  };
};

exports.seed = async function(knex, Promise) {
  const fakeProperties = [];
  const totalFakeProperties = 15;

  for (let i = 0; i < totalFakeProperties; i++) {
    fakeProperties.push(createFakeProperty());
  }
  await knex('house_properties').insert(fakeProperties);
};
