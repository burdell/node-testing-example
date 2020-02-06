describe('User Service', () => {
  let updateUser;
  let mockHttp;
  let mockQueue;
  let mockUser;
  let failUpdate;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    mockHttp = jest.fn().mockResolvedValue({});
    const errorUpdating = () => {
      throw new Error('ya goofed');
    };
    jest.doMock('../services/http', () => ({
      send: params => {
        return failUpdate ? errorUpdating() : mockHttp(params);
      }
    }));

    mockQueue = jest.fn().mockResolvedValue({});
    jest.doMock('../services/queue', () => ({ send: mockQueue }));

    mockUser = {
      userId: '1234',
      name: 'George P Burdell',
      email: 'gpburdell@gmail.com'
    };

    updateUser = require('.');
  });

  it('updates a user', async () => {
    await updateUser(mockUser);

    const mockRequest = mockHttp.mock.calls[0][0];
    expect(mockRequest.verb).toEqual('PUT');
    expect(mockRequest.url).toEqual(
      `http://localhost:3000/user/${mockUser.userId}`
    );
    expect(mockRequest.body).toEqual({
      name: mockUser.name,
      email: mockUser.email
    });

    const mockQueueCall = mockQueue.mock.calls[0][0];
    expect(mockQueueCall.message).toEqual('You have Passed.');
    expect(mockQueueCall.queue).toEqual('CoolQueue');
  });

  it('handles failing to update a user', async () => {
    failUpdate = true;

    await updateUser(mockUser);

    expect(mockHttp).not.toHaveBeenCalled();

    const mockQueueCall = mockQueue.mock.calls[0][0];
    expect(mockQueueCall.message).toEqual('You have Failed.');
    expect(mockQueueCall.queue).toEqual('CoolQueue');
  });
});
