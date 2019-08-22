import EntityService from './EntityService';

export default class UsersService extends EntityService {
  constructor({ themesDao, usersDao, logger }) {
    super({ logger }); // before I do this constructor, I call parent's constructor
    this.themesDao = themesDao;
    this.usersDao = usersDao;
  }

  // updateThemeByUserId({ actor, userId }) {
  //   try {
  //     this.logger.trace('UsersService.updateThemeByUserId/input: ', {
  //       actor,
  //       userId,
  //       theme,
  //     });
  //     if (!actor || !userId) {
  //       throw this.createErrorInvalidInput('actor, userId, color');
  //     }
  //     if (actor.id !== userId) {
  //       throw this.createErrorPermissionDenied('actor.id != userId');
  //     }

  //     const theme = this.themesDao.getThemeByThemeId(color);

  //     this.logger.trace('UsersService.updateThemeByUserId/output: ', theme);
  //     return theme;
  //   } catch (err) {
  //     this.logger.trace('UsersService.updateThemeByUserId/error: ', { err });
  //   }
  // }

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

      const allUsers = this.usersDao.getAllUsers();

      this.logger.trace('UsersService.getAllUsers/output: ', allUsers);
      return allUsers;
    } catch (err) {
      this.logger.trace('UsersService.getAllUsers/error: ', { err });
    }
  }
}
