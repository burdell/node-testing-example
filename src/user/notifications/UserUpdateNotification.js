class UserUpdateNotification {
  constructor(message) {
    this.message = message;
    this.queue = 'CoolQueue';
  }
}

module.exports = UserUpdateNotification;
