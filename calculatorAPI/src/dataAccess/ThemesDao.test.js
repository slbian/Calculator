import ThemesDao from './ThemesDao';
import knex from 'knex';
import mockKnex from 'mock-knex';

const db = knex({
  client: 'pg',
});
mockKnex.mock(db);

const tracker = mockKnex.getTracker();

describe('ThemesDao', () => {
  const logger = {
    trace: jest.fn(() => {}),
  };
  const entityName = 'themes';
  const themesDao = new ThemesDao({
    logger,
    db,
    entityName,
  });

  themesDao.createErrorInvalidInput = jest.fn(
    themesDao.createErrorInvalidInput
  );

  beforeAll(() => {
    tracker.install();
  });

  afterAll(() => {
    tracker.uninstall();
  });

  describe('getThemeByThemeId', () => {
    const themeId = 1;
    const theme = { themeId, color: 'violet' };

    it('returns as expected', async () => {
      tracker.on('query', async query => {
        query.response([theme]);
      });
      const actual = await themesDao.getThemeByThemeId(themeId);
      expect(actual).toEqual(theme);
    });

    it('throws createErrorInvalidInput when no themeId', async () => {
      try {
        await themesDao.getThemeByThemeId(undefined);

        throw new Error('Faulty test');
      } catch (e) {
        expect(themesDao.createErrorInvalidInput).toHaveBeenCalledTimes(1);
        expect(themesDao.createErrorInvalidInput).toHaveBeenCalledWith(
          'userId'
        );
      }
    });
  });
  describe('getAllThemes', () => {
    const themes = [{ id: 1, color: 'black' }, { id: 2, color: 'fake' }];

    it('returns as expected', async () => {
      tracker.on('query', async query => {
        query.response(themes);
      });

      const actual = await themesDao.getAllThemes();

      expect(actual).toEqual(themes);
    });
  });
});
