const { sequelize } = require("../models");

module.exports = function () {
  sequelize
    .sync()
    .then(() => {
      console.log("Database connection established.");
    })
    .catch((error) => {
      console.error("Error connecting to database: ", error);
    });
};
