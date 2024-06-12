const Joi = require("joi");

const userLoginSchema = Joi.object({
  email: Joi.string().min(11).required(),
  password: Joi.string().min(8).max(20).required(),
});

module.exports = {
  userLoginSchema,
};
