const Joi = require('@hapi/joi');

function validate(model, payload) {
  const schema = Joi.object(model);
  const { error } = schema.validate(payload);

  if (error) {
    throw new Error('Bad data');
  }

  return;
}

module.exports = validate;
