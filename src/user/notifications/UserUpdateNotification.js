class UserUpdateFailedNotification {
  constructor(message) {
    this.message = message;
    this.queue = 'CoolQueue';
  }
}

module.exports = UserUpdateFailedNotification;
