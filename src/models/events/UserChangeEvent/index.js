const Joi = require('@hapi/joi');

module.exports = {
  name: Joi.string().required(),
  email: Joi.string().required(),
  userId: Joi.string().required()
};
