import ThemesService from './ThemesService';

describe('ThemesService', () => {
  const actor = { id: 2, themeId: 1 };
  const userId = 2;

  describe('getThemeByUserId', () => {
    const themesDao = {
      getThemeByThemeId: jest.fn(),
    };

    const logger = {
      trace: jest.fn(),
    };
    const themesService = new ThemesService({
      themesDao,
      logger,
    });

    themesService.createErrorInvalidInput = jest.fn(
      themesService.createErrorInvalidInput
    );
    themesService.createErrorPermissionDenied = jest.fn(
      themesService.createErrorPermissionDenied
    );

    it('returns as expected', async () => {
      const theme = { id: 1, color: 'violet' };
      themesDao.getThemeByThemeId.mockReturnValueOnce(theme);

      const actual = await themesService.getThemeByUserId({
        actor,
        userId,
      });

      expect(actual).toEqual(theme);
      expect(themesDao.getThemeByThemeId).toHaveBeenCalledTimes(1);
      expect(themesDao.getThemeByThemeId).toHaveBeenCalledWith(actor.themeId);
    });

    it('throws createErrorInvalidInput when no actor/userId, and if actor.id !== userId', async () => {
      try {
        const actor = { id: undefined };
        const userId = undefined;
        await themesService.getThemeByUserId({ actor, userId });
        throw Error('Faulty test');
      } catch (e) {
        expect(themesService.createErrorInvalidInput).toHaveBeenCalledTimes(1);
        expect(themesService.createErrorInvalidInput).toHaveBeenCalledWith(
          'actor, userId'
        );
      }
      try {
        const userId = 1;
        await themesService.getThemeByUserId({ actor, userId });
        throw Error('Faulty test');
      } catch (e) {
        expect(themesService.createErrorPermissionDenied).toHaveBeenCalledTimes(
          1
        );
        expect(themesService.createErrorPermissionDenied).toHaveBeenCalledWith(
          'actor.id != userId'
        );
      }
    });
  });
  describe('getAllThemes', () => {
    const themesDao = {
      getAllThemes: jest.fn(),
    };

    const logger = {
      trace: jest.fn(),
    };
    const themesService = new ThemesService({
      themesDao,
      logger,
    });

    themesService.createErrorInvalidInput = jest.fn(
      themesService.createErrorInvalidInput
    );
    themesService.createErrorPermissionDenied = jest.fn(
      themesService.createErrorPermissionDenied
    );

    it('returns as expected', async () => {
      const themes = [{ id: 1, color: 'violet' }, { id: 2, color: 'green' }];
      themesDao.getAllThemes.mockReturnValueOnce(themes);

      const actual = await themesService.getAllThemes({ actor, userId });

      expect(actual).toEqual(themes);
      expect(themesDao.getAllThemes).toHaveBeenCalledTimes(1);
    });

    it('throws createErrorInvalidInput when no actor/userId/euation, and if actor.id !== userId', async () => {
      try {
        await themesService.getAllThemes({});
        throw Error('Faulty test');
      } catch (e) {
        expect(themesService.createErrorInvalidInput).toHaveBeenCalledTimes(1);
        expect(themesService.createErrorInvalidInput).toHaveBeenCalledWith(
          'actor, userId'
        );
      }
      try {
        const userId = 33;
        await themesService.getAllThemes({ actor, userId });
        throw Error('Faulty test');
      } catch (e) {
        expect(themesService.createErrorPermissionDenied).toHaveBeenCalledTimes(
          1
        );
        expect(themesService.createErrorPermissionDenied).toHaveBeenCalledWith(
          'actor.id != userId'
        );
      }
    });
  });
});
