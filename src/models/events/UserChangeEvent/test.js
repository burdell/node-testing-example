describe('UserChangeEvent', () => {
  let joiMock;
  let joiMethodMock;
  let UserChangeEvent;

  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();

    joiMethodMock = jest.fn().mockReturnThis();
    joiMock = {
      string: joiMethodMock,
      required: joiMethodMock
    };

    jest.doMock('@hapi/joi', () => joiMock);

    UserChangeEvent = require('.');
  });

  it('validates an event', () => {
    expect(UserChangeEvent).toEqual({
      name: joiMock.string().required(),
      email: joiMock.string().required(),
      userId: joiMock.string().required()
    });
  });
});
