const httpService = require('../services/http');
const queue = require('../services/queue');

const ChangeUserRequest = require('./requests/ChangeUserRequest');
const SuccessNotification = require('./notifications/UserUpdatePassedNotification');
const FailedNotification = require('./notifications/UserUpdateFailedNotification');

async function updateUser(payload) {
  const req = new ChangeUserRequest(payload);
  try {
    await httpService.send(req);
    await queue.send(new SuccessNotification());
  } catch (e) {
    await queue.send(new FailedNotification());
  }
}

module.exports = updateUser;
