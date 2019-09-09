import UsersController from './UsersController';

// https://jestjs.io/docs/en/expect
describe('getActiveUser - UsersController', () => {
  const usersService = {};
  const themesService = {
    getThemeByUserId: jest.fn(
      () => new Promise(resolve => resolve({ id: 1, color: 'black' }))
    ),
  };
  const executionsService = {
    getScoreByUserId: jest.fn(() => new Promise(resolve => resolve(3))),
  };
  const logger = {
    trace: jest.fn(() => {}),
  };
  const usersController = new UsersController({
    usersService,
    themesService,
    executionsService,
    logger,
  });

  usersController.createErrorInvalidInput = jest.fn(
    usersController.createErrorInvalidInput
  );

  const req = { actor: { id: 2 } };
  const res = { json: () => 200, status: () => 500 };
  it('returns as expected', async () => {
    const actual = await usersController.getActiveUser(req, res);

    expect(executionsService.getScoreByUserId).toHaveBeenCalledTimes(1);
    expect(executionsService.getScoreByUserId).toHaveBeenCalledWith({
      actor: req.actor,
      userId: req.actor.id,
    });

    expect(themesService.getThemeByUserId).toHaveBeenCalledTimes(1);
    expect(themesService.getThemeByUserId).toHaveBeenCalledWith({
      actor: req.actor,
      userId: req.actor.id,
    });

    expect(actual).toEqual(200);
  });

  it('throws createErrorInvalidInput when no actor on req body', async () => {
    const req = {};
    const actual = await usersController.getActiveUser(req, res);
    expect(usersController.createErrorInvalidInput).toHaveBeenCalledTimes(1);
    expect(usersController.createErrorInvalidInput).toHaveBeenCalledWith(
      'actor'
    );
    expect(actual).toEqual(500);
  });
});

describe('updateActiveUserTheme - UsersController', () => {
  const usersService = {
    updateActiveUserTheme: jest.fn(
      () => new Promise(resolve => resolve({ id: 2, themeId: 3 }))
    ),
  };
  const themesService = {};
  const executionsService = {};
  const logger = {
    trace: jest.fn(() => {}),
  };
  const usersController = new UsersController({
    usersService,
    themesService,
    executionsService,
    logger,
  });

  usersController.createErrorInvalidInput = jest.fn(
    usersController.createErrorInvalidInput
  );

  const req = { actor: { id: 2 }, query: { themeId: 2 } };
  const res = { json: () => 200, status: () => 500 };
  it('returns as expected', async () => {
    const actual = await usersController.updateActiveUserTheme(req, res);

    expect(usersService.updateActiveUserTheme).toHaveBeenCalled();
    expect(usersService.updateActiveUserTheme).toHaveBeenCalledWith({
      actor: req.actor,
      userId: req.actor.id,
      themeId: req.query.themeId,
    });
    expect(actual).toEqual(200);
  });

  it('throws createErrorInvalidInput when no actor on req body', async () => {
    const req = {};
    const actual = await usersController.updateActiveUserTheme(req, res);
    expect(usersController.createErrorInvalidInput).toHaveBeenCalledWith(
      'actor',
      'themeId'
    );
    expect(usersController.createErrorInvalidInput).toHaveBeenCalledTimes(1);
    expect(actual).toEqual(500);
  });
});

describe('updateActiveUserTheme - UsersController', () => {
  const usersService = {
    updateActiveUserTheme: jest.fn(
      () => new Promise(resolve => resolve({ id: 2, themeId: 3 }))
    ),
  };
  const themesService = {};
  const executionsService = {};
  const logger = {
    trace: jest.fn(() => {}),
  };
  const usersController = new UsersController({
    usersService,
    themesService,
    executionsService,
    logger,
  });

  usersController.createErrorInvalidInput = jest.fn(
    usersController.createErrorInvalidInput
  );

  const req = { actor: { id: 2 }, query: { themeId: 2 } };
  const res = { json: () => 200, status: () => 500 };
  it('returns as expected', async () => {
    const actual = await usersController.updateActiveUserTheme(req, res);

    expect(usersService.updateActiveUserTheme).toHaveBeenCalled();
    expect(usersService.updateActiveUserTheme).toHaveBeenCalledWith({
      actor: req.actor,
      userId: req.actor.id,
      themeId: req.query.themeId,
    });
    expect(actual).toEqual(200);
  });

  it('throws createErrorInvalidInput when no actor on req body', async () => {
    const req = {};
    const actual = await usersController.updateActiveUserTheme(req, res);
    expect(usersController.createErrorInvalidInput).toHaveBeenCalledWith(
      'actor',
      'themeId'
    );
    expect(usersController.createErrorInvalidInput).toHaveBeenCalledTimes(1);
    expect(actual).toEqual(500);
  });
});

describe('getAllUsers - UsersController', () => {
  const usersService = {
    getAllUsers: jest.fn(
      () =>
        new Promise(resolve =>
          resolve({ id: 1, themeId: 2 }, { id: 2, themeId: 3 })
        )
    ),
  };
  const themesService = {};
  const executionsService = {};
  const logger = {
    trace: jest.fn(() => {}),
  };
  const usersController = new UsersController({
    usersService,
    themesService,
    executionsService,
    logger,
  });

  usersController.createErrorInvalidInput = jest.fn(
    usersController.createErrorInvalidInput
  );

  const req = { actor: { id: 2 } };
  const res = { json: () => 200, status: () => 500 };
  it('returns as expected', async () => {
    const actual = await usersController.getAllUsers(req, res);

    expect(usersService.getAllUsers).toHaveBeenCalled();
    expect(usersService.getAllUsers).toHaveBeenCalledWith({
      actor: req.actor,
      userId: req.actor.id,
    });
    expect(actual).toEqual(200);
  });

  it('throws createErrorInvalidInput when no actor on req body', async () => {
    const req = {};
    const actual = await usersController.getAllUsers(req, res);
    expect(usersController.createErrorInvalidInput).toHaveBeenCalledWith(
      'actor'
    );
    expect(usersController.createErrorInvalidInput).toHaveBeenCalledTimes(1);
    expect(actual).toEqual(500);
  });
});
// jest coverage report HTML
