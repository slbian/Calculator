import ExecutionsDao from './ExecutionsDao';
import knex from 'knex';
import mockKnex from 'mock-knex';

const db = knex({
  client: 'pg',
});
mockKnex.mock(db);

const tracker = mockKnex.getTracker();

describe('ExecutionsDao', () => {
  const logger = {
    trace: jest.fn(() => {}),
  };
  const entityName = 'executions';
  const executionsDao = new ExecutionsDao({
    logger,
    db,
    entityName,
  });

  executionsDao.createErrorInvalidInput = jest.fn(
    executionsDao.createErrorInvalidInput
  );

  beforeAll(() => {
    tracker.install();
  });

  afterAll(() => {
    tracker.uninstall();
  });

  describe('getScoreByUserId', () => {
    const userId = 1;
    const mockScore = { userId, sum: '43.00' };

    it('returns as expected', async () => {
      tracker.on('query', async query => {
        query.response([mockScore]);
      });

      const actual = await executionsDao.getScoreByUserId(userId);

      expect(actual).toEqual(mockScore.sum);
    });

    it('throws createErrorInvalidInput when no userId', async () => {
      try {
        await executionsDao.getScoreByUserId(undefined);

        throw new Error('Faulty test');
      } catch (e) {
        expect(executionsDao.createErrorInvalidInput).toHaveBeenCalledTimes(1);
        expect(executionsDao.createErrorInvalidInput).toHaveBeenCalledWith(
          'userId'
        );
      }
    });
  });
  describe('getAllScores', () => {
    const userId = 1;
    const mockScores = { userId, sum: '43.00' };

    it('returns as expected', async () => {
      tracker.on('query', async query => {
        query.response(mockScores);
      });

      const actual = await executionsDao.getAllScores(userId);

      expect(actual).toEqual(mockScores);
    });
  });
  describe('addExecution', () => {
    const userId = 1;
    const equation = '3+5';
    const executions = [
      { userId: 2, equation: '4*4' },
      { userId: 3, equation: '4*3' },
    ];

    it('returns as expected', async () => {
      tracker.on('query', async query => {
        query.response(executions);
      });

      const actual = await executionsDao.addExecution(userId, equation);

      expect(actual).toEqual(executions);
    });

    it('throws createErrorInvalidInput when no userId', async () => {
      try {
        await executionsDao.addExecution(undefined);

        throw new Error('Faulty test');
      } catch (e) {
        expect(executionsDao.createErrorInvalidInput).toHaveBeenCalledTimes(1);
        expect(executionsDao.createErrorInvalidInput).toHaveBeenCalledWith(
          'userId, equation'
        );
      }
    });
  });
});
