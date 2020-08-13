import UsersService from './UsersService';

describe('UsersService', () => {
  const actor = { id: 2, themeId: 1 };
  const userId = 2;

  describe('updateActiveUserTheme', () => {
    const usersDao = {
      updateActiveUserTheme: jest.fn(),
    };
    const logger = {
      trace: jest.fn(),
    };
    const usersService = new UsersService({
      usersDao,
      logger,
    });

    usersService.createErrorInvalidInput = jest.fn(
      usersService.createErrorInvalidInput
    );
    usersService.createErrorPermissionDenied = jest.fn(
      usersService.createErrorPermissionDenied
    );
    const themeId = 3;
    it('returns as expected', async () => {
      const successfulThemeUpdate = { id: 1, color: 'violet' };
      usersDao.updateActiveUserTheme.mockReturnValueOnce(successfulThemeUpdate);

      const actual = await usersService.updateActiveUserTheme({
        actor,
        userId,
        themeId,
      });
      expect(actual).toEqual(successfulThemeUpdate);
      expect(usersDao.updateActiveUserTheme).toHaveBeenCalledTimes(1);
      expect(usersDao.updateActiveUserTheme).toHaveBeenCalledWith(
        userId,
        themeId
      );
    });

    it('throws createErrorInvalidInput when no actor/userId, and if actor.id !== userId', async () => {
      try {
        await usersService.updateActiveUserTheme({});
        throw Error('Faulty test');
      } catch (e) {
        expect(usersService.createErrorInvalidInput).toHaveBeenCalledTimes(1);
        expect(usersService.createErrorInvalidInput).toHaveBeenCalledWith(
          'actor, userId, color'
        );
      }
    });
    it('throws createErrorInvalidInput when no actor/userId, and if actor.id !== userId', async () => {
      try {
        const userId = 1;
        await usersService.updateActiveUserTheme({ actor, userId, themeId });
        throw Error('Faulty test');
      } catch (e) {
        expect(usersService.createErrorPermissionDenied).toHaveBeenCalledTimes(
          1
        );
        expect(usersService.createErrorPermissionDenied).toHaveBeenCalledWith(
          'actor.id != userId'
        );
      }
    });
  });

  describe('addUser', () => {
    const usersDao = {
      addUser: jest.fn(),
    };
    const logger = {
      trace: jest.fn(),
    };
    const usersService = new UsersService({
      usersDao,
      logger,
    });

    usersService.createErrorInvalidInput = jest.fn(
      usersService.createErrorInvalidInput
    );
    usersService.createErrorPermissionDenied = jest.fn(
      usersService.createErrorPermissionDenied
    );
    const username = 'fake_user';
    const password = 'fake_pass';
    it('returns as expected', async () => {
      const newUserResponse = { id: 1, color: 'violet' };
      usersDao.addUser.mockReturnValueOnce(newUserResponse);

      const actual = await usersService.addUser({ username, password });
      expect(actual).toEqual(newUserResponse);
      expect(usersDao.addUser).toHaveBeenCalledTimes(1);
      expect(usersDao.addUser).toHaveBeenCalledWith(username, password);
    });

    it('throws createErrorInvalidInput when no actor/userId', async () => {
      try {
        const username = undefined;
        const password = undefined;
        await usersService.addUser({ username, password });
        throw Error('Faulty test');
      } catch (e) {
        expect(usersService.createErrorInvalidInput).toHaveBeenCalledTimes(1);
        expect(usersService.createErrorInvalidInput).toHaveBeenCalledWith(
          'username, password'
        );
      }
    });
  });
});
