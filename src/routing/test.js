describe('Router', () => {
  let router;
  let validateMock;
  let userServiceMock;
  let mockEvent;
  let mockModel;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    validateMock = jest.fn();
    jest.doMock('../services/validate', () => validateMock);

    userServiceMock = jest.fn().mockResolvedValue({});
    jest.doMock('../services/user', () => userServiceMock);

    mockModel = 'somemodel';

    mockEvent = {
      type: 'UserChange',
      payload: {
        userId: '1234',
        name: 'George P Burdell',
        email: 'gpburdell@gmail.com'
      },
      model: mockModel
    };

    router = require('.');
  });

  it('routes an event', async () => {
    await router(mockEvent);

    expect(validateMock).toHaveBeenCalledWith(mockModel, mockEvent.payload);
    expect(userServiceMock).toHaveBeenCalledWith(mockEvent.payload);
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
