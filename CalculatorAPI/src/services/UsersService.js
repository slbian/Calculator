import EntityService from './EntityService';
import _ from 'lodash';

export default class UsersService extends EntityService {
  constructor({ logger, themesDao, executionsDao, usersDao }) {
    super({ logger }); // before I do this constructor, I call parent's constructor
    this.themesDao = themesDao;
    this.executionsDao = executionsDao;
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
      console.log('>>> allUsers', allUsers);

      let scores = await this.executionsDao.getAllScores();
      console.log('>>> scores', scores);
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
