describe('ChangeUserRequest', () => {
  let configMock;
  let ChangeUserRequest;
  let mockUser;

  beforeEach(() => {
    configMock = {
      baseUrl: 'http://lol.not.real'
    };
    jest.doMock('../../../config', () => configMock);

    mockUser = {
      userId: '1234',
      name: 'Ignatius J Reilly',
      email: 'ireilly@email'
    };

    ChangeUserRequest = require('.');
  });

  it('creates a change user request', () => {
    const request = new ChangeUserRequest(mockUser);

    expect(request.verb).toEqual('PUT');
    expect(request.url).toEqual(
      `${configMock.baseUrl}/user/${mockUser.userId}`
    );
    expect(request.body).toEqual({
      name: mockUser.name,
      email: mockUser.email
    });
  });
});
