const faker = require('faker');

const createWorkOrder = () => {
  const tenantId = faker.random.number({
    min: 4,
    max: 10,
  });

  const propertyAccess =
    faker.random.number({
      min: 1,
      max: 2,
    }) === 1
      ? true
      : false;

  return {
    description: faker.lorem.sentence(),
    property_access: propertyAccess,
    work_order_status: 'in progress',
    tenant_id: tenantId,
    house_id: faker.random.number({
      min: 1,
      max: 15,
    }),
  };
};

exports.seed = async function(knex, Promise) {
  const WorkOrders = [];
  const totalWorkOrders = 25;

  for (let i = 0; i < totalWorkOrders; i++) {
    WorkOrders.push(createWorkOrder());
  }
  await knex('work_orders').insert(WorkOrders);
};
