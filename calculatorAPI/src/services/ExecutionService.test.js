import ExecutionsService from './ExecutionsService';

// https://jestjs.io/docs/en/expect
describe('getScoreByUserId - ExecutionsService', () => {
  const executionsDao = {
    getScoreByUserId: jest.fn(),
  };

  const logger = {
    trace: jest.fn(),
  };
  const executionsService = new ExecutionsService({
    executionsDao,
    logger,
  });

  executionsService.createErrorInvalidInput = jest.fn(
    executionsService.createErrorInvalidInput
  );

  const actor = { id: 2, themeId: 1 };
  const userId = 2;
  it('returns as expected', async () => {
    // TODO: refactor to mockreturvalue
    executionsDao.getScoreByUserId.mockReturnValueOnce(10);

    const actual = await executionsService.getScoreByUserId({ actor, userId });

    expect(actual).toEqual(10);
    expect(executionsDao.getScoreByUserId).toHaveBeenCalledTimes(1);
    expect(executionsDao.getScoreByUserId).toHaveBeenCalledWith(userId);
  });

  it('throws createErrorInvalidInput when no actor on req body', async () => {
    try {
      const actor = { id: undefined };
      const userId = undefined;
      await executionsService.getScoreByUserId({ actor, userId });
      throw Error('Faulty test');
    } catch (e) {
      expect(executionsService.createErrorInvalidInput).toHaveBeenCalledTimes(
        1
      );
      expect(executionsService.createErrorInvalidInput).toHaveBeenCalledWith(
        'actor, userId'
      );
    }
  });
});
