import ThemesController from './ThemesController';

// https://jestjs.io/docs/en/expect
describe('getAllThemes - ThemesController', () => {
  const themesService = {
    getAllThemes: jest.fn(
      () => new Promise(resolve => resolve({ id: 1, color: 'black' }))
    ),
  };

  const logger = {
    trace: jest.fn(() => {}),
  };
  const themesController = new ThemesController({
    themesService,
    logger,
  });

  themesController.createErrorInvalidInput = jest.fn(
    themesController.createErrorInvalidInput
  );

  const req = { actor: { id: 2 } };
  const res = { json: () => 200, status: () => 500 };
  it('returns as expected', async () => {
    const actual = await themesController.getAllThemes(req, res);

    expect(themesService.getAllThemes).toHaveBeenCalledTimes(1);
    expect(themesService.getAllThemes).toHaveBeenCalledWith({
      actor: req.actor,
      userId: req.actor.id,
    });

    expect(actual).toEqual(200);
  });

  it('throws createErrorInvalidInput when no actor on req body', async () => {
    const req = {};
    const actual = await themesController.getAllThemes(req, res);
    expect(themesController.createErrorInvalidInput).toHaveBeenCalledTimes(1);
    expect(themesController.createErrorInvalidInput).toHaveBeenCalledWith(
      'actor'
    );
    expect(actual).toEqual(500);
  });
});
