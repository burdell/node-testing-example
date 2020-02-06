const validate = require('../services/validate');
const updateUser = require('../user');

async function appRouting(event) {
  switch (event.type) {
    case 'UserChange':
      validate(event.model, event.payload);
      await updateUser(event.payload);
      return;
    default:
      throw new Error('Invalid Event');
  }
}

module.exports = appRouting;
