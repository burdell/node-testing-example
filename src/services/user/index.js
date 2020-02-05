const ChangeUserRequest = require('../../models/requests/ChangeUserRequest');
const httpService = require('../http');
const queue = require('../queue');
const SuccessNotification = require('../../models/notifications/UserUpdatePassedNotification');
const FailedNotification = require('../../models/notifications/UserUpdateFailedNotification');

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
