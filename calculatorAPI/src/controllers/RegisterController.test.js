import RegisterController from './RegisterController';

// https://jestjs.io/docs/en/expect
describe.only('addUser - RegisterController', () => {
  const usersService = {
    addUser: jest.fn(
      () =>
        new Promise(resolve => resolve({ id: 1, themeId: 1, username: 'fake' }))
    ),
  };

  const logger = {
    trace: jest.fn(() => {}),
  };
  const registerController = new RegisterController({
    usersService,
    logger,
  });

  registerController.createErrorInvalidInput = jest.fn(
    registerController.createErrorInvalidInput
  );

  const req = { body: { username: 'fake', password: 'fake' } };
  const res = {
    json: () => 200,
    status: () => 409,
    send: () => 'Username taken',
  };
  it('returns as expected', async () => {
    const actual = await registerController.addUser(req, res);

    expect(usersService.addUser).toHaveBeenCalledTimes(1);
    expect(usersService.addUser).toHaveBeenCalledWith({
      username: req.body.username,
      password: req.body.password,
    });

    expect(actual).toEqual(200);
  });

  it('throws createErrorInvalidInput when no actor on req body', async () => {
    const req = { body: {} };
    const actual = await registerController.addUser(req, res);
    expect(registerController.createErrorInvalidInput).toHaveBeenCalledTimes(1);
    expect(registerController.createErrorInvalidInput).toHaveBeenCalledWith(
      'username, password'
    );
    console.log(actual);
    expect(actual).toEqual(409);
  });
});
