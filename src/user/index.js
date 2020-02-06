const httpService = require('../services/http');
const queue = require('../services/queue');
const PutRequest = require('../services/http/put');

const Notification = require('./notifications/UserUpdateNotification');

async function updateUser(payload) {
  const { userId, ...body } = payload;
  const req = new PutRequest(`user/${userId}`, body);

  try {
    await httpService.send(req);
    await queue.send(new Notification('You have Passed.'));
  } catch (e) {
    await queue.send(new Notification('You have Failed.'));
  }
}

module.exports = updateUser;
