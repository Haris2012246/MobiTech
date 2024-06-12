const { configSchema } = require("../utils/validation/config-schema");
require("dotenv").config();

module.exports = () => {
  const { PORT, JWT_KEY } = process.env;
  const { error } = configSchema.validate({ PORT, JWT_KEY });

  if (error) {
    throw new Error(`Config Error: ${error.details.map((i) => i.message).join(", ")}`);
  }
};
