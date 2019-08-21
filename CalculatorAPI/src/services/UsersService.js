import EntityService from './EntityService';

export default class UsersService extends EntityService {
  constructor({ themesDAO, usersDAO, logger }) {
    super({ logger }); // before I do this constructor, I call parent's constructor
    this.themesDAO = themesDAO;
    this.usersDAO = usersDAO;
  }

  updateThemeByUserId({ actor, userId }) {
    try {
      this.logger.trace('UsersService.updateThemeByUserId/input: ', {
        actor,
        userId,
      });
      if (!actor || !userId) {
        throw this.createErrorInvalidInput('actor, userId');
      }
      if (actor.id !== userId) {
        throw this.createErrorPermissionDenied('actor.id != userId');
      }

      const theme = this.themesDAO.getThemeByThemeId(actor.themeId);

      this.logger.trace('UsersService.updateThemeByUserId/output: ', theme);
      return theme;
    } catch (err) {
      this.logger.trace('UsersService.updateThemeByUserId/error: ', { err });
    }
  }

  getAllUsers({ actor, userId }) {
    try {
      this.logger.trace('UsersService.getAllUsers/input: ', {
        actor,
        userId,
      });
      if (!actor || !userId) {
        throw this.createErrorInvalidInput('actor, userId');
      }
      if (actor.id !== userId) {
        throw this.createErrorPermissionDenied('actor.id != userId');
      }

      const allUsers = this.usersDAO.getAllUsers();

      this.logger.trace('UsersService.getAllUsers/output: ', allUsers);
      return allUsers;
    } catch (err) {
      this.logger.trace('UsersService.getAllUsers/error: ', { err });
    }
  }
}
