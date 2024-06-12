const Joi = require('joi');

const inspectionRequestSchema = Joi.object({
  productId: Joi.number().required(),
  date: Joi.date().required(),
  homeAddress: Joi.string().required(),
  status: Joi.valid('Pending','Approved')
});

const inspectionUpdateSchema = Joi.object({
  date: Joi.date(),
  homeAddress: Joi.string(),
  status: Joi.valid()
}).min(1);

module.exports = {inspectionRequestSchema,inspectionUpdateSchema};
                                                          