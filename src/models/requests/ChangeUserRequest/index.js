const { baseUrl } = require('../../../config');

class ChangeUserRequest {
  constructor(payload) {
    const { userId, ...body } = payload;

    this.verb = 'PUT';
    this.url = `${baseUrl}/user/${userId}`;
    this.body = body;
  }
}

module.exports = ChangeUserRequest;
