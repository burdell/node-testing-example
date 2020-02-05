describe('UserUpdatePassedNotification', () => {
  let Notification;

  beforeEach(() => {
    Notification = require('.');
  });

  it('initializes a notification', () => {
    const notif = new Notification();
    expect(notif.queue).toEqual('CoolQueue');
    expect(notif.message).toEqual('You have Passed.');
  });
});
