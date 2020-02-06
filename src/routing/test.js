describe('Router', () => {
  let router;
  let userServiceMock;
  let mockEvent;
  let changeUserModel;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    userServiceMock = jest.fn().mockResolvedValue({});
    jest.doMock('../user', () => userServiceMock);

    router = require('.');
    changeUserModel = require('./events/UserChangeEvent');

    mockEvent = {
      type: 'UserChange',
      payload: {
        userId: '1234',
        name: 'George P Burdell',
        email: 'gpburdell@gmail.com'
      },
      model: changeUserModel
    };
  });

  it('routes a UserChange event', async () => {
    await router(mockEvent);

    expect(userServiceMock).toHaveBeenCalledWith(mockEvent.payload);
  });

  it('does not route a UserChange event with invalid data', async () => {
    mockEvent.payload.userId = undefined;

    try {
      await router(mockEvent);
    } catch (e) {
      expect(e.message).toEqual('Bad data');
    }
  });

  it('throws an error for invalid events', async () => {
    mockEvent.type = 'NOTREAL';

    try {
      await router(mockEvent);
    } catch (e) {
      expect(e.message).toEqual('Invalid Event');
    }
  });
});
