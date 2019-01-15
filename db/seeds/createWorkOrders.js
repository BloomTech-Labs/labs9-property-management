const faker = require("faker");

const createWorkOrder = () => {
  const tenantId = faker.random.number({
    min: 26,
    max: 100
  });

  const trueFalse =
    faker.random.number({
      min: 1,
      max: 2
    }) === 1
      ? true
      : false;

  return {
    address:
      faker.address.streetAddress() +
      faker.address.city() +
      faker.address.country(),
    description: faker.lorem.paragraph(),
    property_access: trueFalse,
    work_order_status: "in progress",
    tenant_id: tenantId,
    house_id: faker.random.number({
      min: 1,
      max: 100
    })
  };
};

exports.seed = async function(knex, Promise) {
  const WorkOrders = [];
  const totalWorkOrders = 100;

  for (let i = 0; i < totalWorkOrders; i++) {
    WorkOrders.push(createWorkOrder());
  }
  await knex("work_orders").insert(WorkOrders);
};
