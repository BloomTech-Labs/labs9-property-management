const db = require("../db/dbConfig");

module.exports = {
  getUserProperties: function(userId) {
    return db("properties as p")
      .join("users as u", "u.id", "p.user_id")
      .select("u.first_name", "u.last_name", "p.id", "p.address", "p.bedrooms")
      .where("p.user_id", userId);
  }
};
