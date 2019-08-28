import EntityService from './EntityService';
import _ from 'lodash';

export default class UsersService extends EntityService {
  constructor({ logger, themesDao, executionsDao, usersDao }) {
    super({ logger }); // before I do this constructor, I call parent's constructor
    this.themesDao = themesDao;
    this.executionsDao = executionsDao;
    this.usersDao = usersDao;
  }

  async updateActiveUserTheme({ actor, userId, themeId }) {
    try {
      this.logger.trace('UsersService.updateActiveUserTheme/input: ', {
        actor,
        userId,
        themeId,
      });
      if (!actor || !userId || !themeId) {
        throw this.createErrorInvalidInput('actor, userId, color');
      }
      if (actor.id !== userId) {
        throw this.createErrorPermissionDenied('actor.id != userId');
      }

      const successfulThemeUpdate = await this.usersDao.updateActiveUserTheme(
        userId,
        themeId
      );

      this.logger.trace('UsersService.updateActiveUserTheme/output: ', {
        successfulThemeUpdate,
      });
      return successfulThemeUpdate;
    } catch (err) {
      this.logger.trace('UsersService.updateActiveUserTheme/error: ', { err });
    }
  }

  async addUser({ username, password }) {
    try {
      this.logger.trace('UsersService.addUser/input: ', { username, password });
      if (!username || !password) {
        throw this.createErrorInvalidInput('username');
      }
      const newUserResponse = await this.usersDao.addUser(username, password);

      if (!newUserResponse) {
        throw this.createErrorInvalidInput('cannot add user');
      }
      this.logger.trace('UsersService.addUser/output: ', { newUserResponse });
      return newUserResponse;
    } catch (err) {
      console.log({ err });
      this.logger.trace('UsersService.addUser/catch error: ', {
        err,
      });
    }
  }

  async getAllUsers({ actor, userId }) {
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

      const allUsers = await this.usersDao.getAllUsers();

      let scores = await this.executionsDao.getAllScores();
      scores = _.keyBy(scores, 'userId');

      let scoreboardUsers = allUsers.map(user => {
        const populatedUser = {
          ...user,
          score: Number(_.get(scores, `[${user.id}].sum`, 0)),
        };
        return populatedUser;
      });

      scoreboardUsers = _.sortBy(scoreboardUsers, 'score').reverse();

      this.logger.trace('UsersService.getAllUsers/output: ', scoreboardUsers);
      return scoreboardUsers;
    } catch (err) {
      this.logger.trace('UsersService.getAllUsers/error: ', { err });
    }
  }
}
