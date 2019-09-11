import ExecutionsService from './ExecutionsService';

describe('ExecutionsService', () => {
  const actor = { id: 2, themeId: 1 };
  const userId = 2;

  describe('getScoreByUserId', () => {
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
    executionsService.createErrorPermissionDenied = jest.fn(
      executionsService.createErrorPermissionDenied
    );

    it('returns as expected', async () => {
      // TODO: refactor to mockreturvalue
      executionsDao.getScoreByUserId.mockReturnValueOnce(10);

      const actual = await executionsService.getScoreByUserId({
        actor,
        userId,
      });

      expect(actual).toEqual(10);
      expect(executionsDao.getScoreByUserId).toHaveBeenCalledTimes(1);
      expect(executionsDao.getScoreByUserId).toHaveBeenCalledWith(userId);
    });

    it('throws createErrorInvalidInput when no actor/userId, and if actor.id !== userId', async () => {
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
      try {
        const userId = 1;
        await executionsService.getScoreByUserId({ actor, userId });
        throw Error('Faulty test');
      } catch (e) {
        expect(
          executionsService.createErrorPermissionDenied
        ).toHaveBeenCalledTimes(1);
        expect(
          executionsService.createErrorPermissionDenied
        ).toHaveBeenCalledWith('actor.id != userId');
      }
    });
  });
  describe('addExecution', () => {
    const executionsDao = {
      addExecution: jest.fn(),
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
    executionsService.createErrorPermissionDenied = jest.fn(
      executionsService.createErrorPermissionDenied
    );

    const equation = '33*3';
    it('returns as expected', async () => {
      const newExecution = { id: 10, equation };
      executionsDao.addExecution.mockReturnValueOnce(newExecution);

      const actual = await executionsService.addExecution({
        actor,
        userId,
        equation,
      });

      expect(actual).toEqual(newExecution);
      expect(executionsDao.addExecution).toHaveBeenCalledTimes(1);
      expect(executionsDao.addExecution).toHaveBeenCalledWith(userId, equation);
    });

    it('throws createErrorInvalidInput when no actor/userId/euation, and if actor.id !== userId', async () => {
      try {
        await executionsService.addExecution({});
        throw Error('Faulty test');
      } catch (e) {
        expect(executionsService.createErrorInvalidInput).toHaveBeenCalledTimes(
          1
        );
        expect(executionsService.createErrorInvalidInput).toHaveBeenCalledWith(
          'actor, userId, equation'
        );
      }
      try {
        const userId = 33;
        await executionsService.addExecution({ actor, userId, equation });
        throw Error('Faulty test');
      } catch (e) {
        expect(
          executionsService.createErrorPermissionDenied
        ).toHaveBeenCalledTimes(1);
        expect(
          executionsService.createErrorPermissionDenied
        ).toHaveBeenCalledWith('actor.id != userId');
      }
    });
  });
});
