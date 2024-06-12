const Joi = require("joi");

module.exports = function () {
  Joi.defaults((schema) => {
    return schema.options({
      abortEarly: false,
      errors: {
        wrap: {
          label: false,
        },
      },
    });
  });
};
