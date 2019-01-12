const faker = require("faker");

const createFakeUser = () => {
  const userType =
    faker.random.number({
      min: 1,
      max: 2
    }) === 1
      ? "admin"
      : "tenant";

  const propertyId =
    userType === "admin"
      ? null
      : faker.random.number({
          min: 1,
          max: 50
        });

  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    mobile: faker.phone.phoneNumber(),
    password: faker.internet.password(),
    user_type: userType,
    property_id: propertyId
  };
};

exports.seed = async function(knex, Promise) {
  const fakeUsers = [];
  const totalFakeUsers = 100;

  for (let i = 0; i < totalFakeUsers; i++) {
    fakeUsers.push(createFakeUser());
  }
  await knex("users").insert(fakeUsers);
};
