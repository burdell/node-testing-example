const { baseUrl } = require('../../config');

class PutRequest {
  constructor(url, body) {
    this.verb = 'PUT';
    this.url = `${baseUrl}/${url}`;
    this.body = body;
  }
}

module.exports = PutRequest;
