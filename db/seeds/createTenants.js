const faker = require("faker");

const createFakeTenants = () => {
  const tenantId = faker.random.number({
    min: 26,
    max: 100
  });

  const tenantFunctions =
    faker.random.number({
      min: 1,
      max: 2
    }) === 1
      ? true
      : false;

  return {
    // tenant_id: tenantId,
    get_texts: tenantFunctions,
    get_emails: tenantFunctions,
    leased_start_date: "Jan 2018",
    end_date: "Dec 2020"
  };
};

exports.seed = async function(knex, Promise) {
  const fakeTenants = [];
  const totalFakeTenants = 100;

  for (let i = 26; i < totalFakeTenants; i++) {
    fakeTenants.push(createFakeTenants());
  }
  await knex("tenants").insert(fakeTenants);
};
