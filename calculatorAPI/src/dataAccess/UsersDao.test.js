import UsersDao from './UsersDao';
import knex from 'knex';
import mockKnex from 'mock-knex';

const db = knex({
  client: 'pg',
});
mockKnex.mock(db);

const tracker = mockKnex.getTracker();

describe('UsersDao', () => {
  const logger = {
    trace: jest.fn(() => {}),
  };
  const entityName = 'users';
  const usersDao = new UsersDao({
    logger,
    db,
    entityName,
  });

  usersDao.createErrorInvalidInput = jest.fn(usersDao.createErrorInvalidInput);

  beforeAll(() => {
    tracker.install();
  });

  afterAll(() => {
    tracker.uninstall();
  });

  describe('updateActiveUserTheme', () => {
    const userId = 1;
    const themeId = 2;
    const user = { id: 1, username: 'chuck', color: 'violet' };

    it('returns as expected', async () => {
      tracker.on('query', async query => {
        query.response([user]);
      });
      const actual = await usersDao.updateActiveUserTheme(userId, themeId);
      expect(actual).toEqual(user);
    });

    it('throws createErrorInvalidInput when no userId', async () => {
      try {
        await usersDao.updateActiveUserTheme(undefined);

        throw new Error('Faulty test');
      } catch (e) {
        expect(usersDao.createErrorInvalidInput).toHaveBeenCalledTimes(1);
        expect(usersDao.createErrorInvalidInput).toHaveBeenCalledWith(
          'userId, themeId'
        );
      }
    });
  });

  describe('addUser', () => {
    const username = 'fake_user';
    const password = 'fake_password';
    const user = { id: 1, username, color: 'violet' };

    it('returns as expected', async () => {
      tracker.on('query', async query => {
        query.response([user]);
      });
      const actual = await usersDao.addUser(username, password);
      expect(actual).toEqual(user);
    });

    it('throws createErrorInvalidInput when no username/password', async () => {
      try {
        await usersDao.addUser(undefined);

        throw new Error('Faulty test');
      } catch (e) {
        expect(usersDao.createErrorInvalidInput).toHaveBeenCalledTimes(1);
        expect(usersDao.createErrorInvalidInput).toHaveBeenCalledWith(
          'username, password'
        );
      }
    });
  });

  describe('getAllUsers', () => {
    const users = [
      { id: 1, username: 'fake', color: 'black' },
      { id: 2, username: 'fake', color: 'fake' },
    ];

    it('returns as expected', async () => {
      tracker.on('query', async query => {
        query.response(users);
      });

      const actual = await usersDao.getAllUsers();

      expect(actual).toEqual(users);
    });
  });
});
