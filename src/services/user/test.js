describe('User Service', () => {
  let updateUser;
  let mockHttp;
  let mockQueue;
  let mockSuccessNotification;
  let mockFailedNotification;
  let mockUser;
  let mockChangeUserRequest;
  let failUpdate;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    mockHttp = jest.fn().mockResolvedValue({});
    const errorUpdating = () => {
      throw new Error('ya goofed');
    };
    jest.doMock('../http', () => ({
      send: () => {
        return failUpdate ? errorUpdating() : mockHttp();
      }
    }));

    mockQueue = jest.fn().mockResolvedValue({});
    jest.doMock('../queue', () => ({ send: mockQueue }));

    mockSuccessNotification = jest.fn();
    jest.doMock(
      '../../models/notifications/UserUpdatePassedNotification',
      () =>
        class SuccessNotif {
          constructor(args) {
            mockSuccessNotification(args);
          }
        }
    );

    mockFailedNotification = jest.fn();
    class FailNotif {
      constructor(args) {
        mockFailedNotification(args);
      }
    }
    jest.doMock(
      '../../models/notifications/UserUpdateFailedNotification',
      () => FailNotif
    );

    mockChangeUserRequest = jest.fn();
    class MockChangeUserRequest {
      constructor(args) {
        mockChangeUserRequest(args);
      }
    }
    jest.doMock(
      '../../models/requests/ChangeUserRequest',
      () => MockChangeUserRequest
    );

    mockUser = {
      userId: '1234',
      name: 'Ignatius J Reilly',
      email: 'ireilly@email'
    };

    updateUser = require('.');
    failUpdate = false;
  });

  it('updates a user', async () => {
    await updateUser(mockUser);

    expect(mockChangeUserRequest).toHaveBeenCalledWith(mockUser);
    expect(mockFailedNotification).not.toHaveBeenCalled();
    expect(mockSuccessNotification).toHaveBeenCalled();
    expect(mockQueue).toHaveBeenCalled();
  });

  it('handles failing to update a user', async () => {
    failUpdate = true;

    await updateUser(mockUser);

    expect(mockChangeUserRequest).toHaveBeenCalledWith(mockUser);
    expect(mockSuccessNotification).not.toHaveBeenCalled();
    expect(mockFailedNotification).toHaveBeenCalled();
    expect(mockQueue).toHaveBeenCalled();
  });
});
