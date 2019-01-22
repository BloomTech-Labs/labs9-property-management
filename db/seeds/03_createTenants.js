const faker = require('faker');

//   const tenantFunctions =
//     faker.random.number({
//       min: 1,
//       max: 2
//     }) === 1
//       ? true
//       : false;

//   return {
//     tenant_id: tenantId,
//     get_texts: tenantFunctions,
//     get_emails: tenantFunctions,
//     leased_start_date: "Jan 2018",
//     end_date: "Dec 2020"
//   };
// };

// exports.seed = async function(knex, Promise) {
//   const fakeTenants = [];
//   const totalFakeTenants = 7;

//   for (let i = 1; i < totalFakeTenants; i++) {
//     fakeTenants.push(createFakeTenants());
//   }
//   await knex("tenants").insert(fakeTenants);
// };

exports.seed = function(knex, Promise) {
  return knex('tenants')
    .del() // delete existing posts
    .then(function() {
      return knex('tenants').insert([
        {
          tenant_uid: 4,
          leased_start_date: 'December 2018',
          end_date: 'January 2020',
          house_id: faker.random.number({
            min: 1,
            max: 15,
          }),
        },
        {
          tenant_uid: 5,
          leased_start_date: 'December 2018',
          end_date: 'January 2020',
          house_id: faker.random.number({
            min: 1,
            max: 15,
          }),
        },
        {
          tenant_uid: 6,
          leased_start_date: 'December 2018',
          end_date: 'January 2020',
          house_id: faker.random.number({
            min: 1,
            max: 15,
          }),
        },
        {
          tenant_uid: 7,
          leased_start_date: 'December 2018',
          end_date: 'January 2020',
          house_id: faker.random.number({
            min: 1,
            max: 15,
          }),
        },
        {
          tenant_uid: 8,
          leased_start_date: 'December 2018',
          end_date: 'January 2020',
          house_id: faker.random.number({
            min: 1,
            max: 15,
          }),
        },
        {
          tenant_uid: 9,
          leased_start_date: 'December 2018',
          end_date: 'January 2020',
          house_id: faker.random.number({
            min: 1,
            max: 15,
          }),
        },
        {
          tenant_uid: 10,
          leased_start_date: 'December 2018',
          end_date: 'January 2020',
          house_id: faker.random.number({
            min: 1,
            max: 15,
          }),
        },
      ]);
    });
};
