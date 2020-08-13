import RegisterController from './RegisterController';

describe('addUser - RegisterController', () => {
  const fakeNewUser = { id: 1, themeId: 1, username: 'fake' };
  const usersService = {
    addUser: jest.fn().mockReturnValue(fakeNewUser),
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

  const mockRequest = fakeReq => fakeReq;
  const mockResponse = () => {
    const res = {};
    // mock return of res to allow for chaining of methods (ex res.status().send().json()...)
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };
  it.only('returns as expected', async () => {
    const fakeReq = { body: { username: 'fake', password: 'fake' } };

    const req = mockRequest(fakeReq);
    const res = mockResponse(newUserResponse);

    await registerController.addUser(req, res);

    expect(usersService.addUser).toHaveBeenCalledTimes(1);
    expect(usersService.addUser).toHaveBeenCalledWith({
      username: req.body.username,
      password: req.body.password,
    });

    expect(res.json).toHaveBeenCalledWith(newUserResponse);
  });

  it('throws createErrorInvalidInput when no actor on req body', async () => {
    const fakeReq = { body: {} };
    const req = mockRequest(fakeReq);
    const res = mockResponse();
    await registerController.addUser(req, res);

    expect(registerController.createErrorInvalidInput).toHaveBeenCalledTimes(1);
    expect(registerController.createErrorInvalidInput).toHaveBeenCalledWith(
      'username, password'
    );
    console.log(actual);
    expect(actual).toEqual(409);
  });
});
