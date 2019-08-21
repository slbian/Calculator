import EntityController from './EntityController';
import _ from 'lodash';

export default class UsersController extends EntityController {
  constructor({ usersService, themesService, executionsService, logger }) {
    super({ logger }); // before I do this constructor, I call parent's constructor
    this.usersService = usersService;
    this.themesService = themesService;
    this.executionsService = executionsService;
  }

  // all we send is a token, we just get back the user who is logged in
  // strictly packaging + http management (request, response) - lower levels doesn't know abt express
  getActiveUser = (req, res) => {
    try {
      // get the user, their score, their theme, their last login
      const actor = req.actor;

      // TODO: make logger take in name of the class
      this.logger.trace('UsersController.getActiveUser/input: ', { actor });

      if (!actor) {
        throw this.createErrorInvalidInput('actor');
      }

      const user = actor;

      user.score = this.executionsService.getScoreByUserId({
        actor,
        userId: actor.id,
      });
      if (!user.score) {
        throw this.createErrorUnexpected('score');
      }

      user.theme = this.themesService.getThemeByUserId({
        actor,
        themeId: actor.themeId,
      });
      if (!user.theme) {
        throw this.createErrorUnexpected('theme');
      }

      this.logger.trace('UsersController.getActiveUser/output: ', { user });
      res.json(user);
    } catch (err) {
      this.logger.trace('UsersController.getActiveUser/error: ', { err });
    }
  };

  updateThemeByUserId = (req, res) => {
    try {
      // get the user, their score, their theme, their last login
      const actor = req.actor;

      // TODO: make logger take in name of the class
      this.logger.trace('UsersController.updateThemeByUserId/input: ', {
        actor,
      });

      if (!actor) {
        throw this.createErrorInvalidInput('actor');
      }

      const newTheme = this.themesService.updateThemeByUserId({
        actor,
        userId: actor.id,
      });
      if (!newTheme) {
        throw this.createErrorUnexpected('newTheme');
      }

      this.logger.trace('UsersController.updateThemeByUserId/output: ', {
        newTheme,
      });
      res.json(true);
    } catch (err) {
      this.logger.trace('UsersController.updateThemeByUserId/error: ', { err });
    }
  };

  getAllUsers = (req, res) => {
    try {
      // get the user, their score, their theme, their last login
      const actor = req.actor;

      // TODO: make logger take in name of the class
      this.logger.trace('UsersController.getAllUsers/input: ', {
        actor,
      });

      if (!actor) {
        throw this.createErrorInvalidInput('actor');
      }

      const allUsers = this.usersService.getAllUsers({
        actor,
        userId: actor.id,
      });
      if (!allUsers) {
        throw this.createErrorUnexpected('allUsers');
      }

      const orderedUsers = _.sortBy(allUsers, 'score').reverse();

      this.logger.trace('UsersController.getAllUsers/output: ', {
        orderedUsers,
      });
      res.json(orderedUsers);
    } catch (err) {
      this.logger.trace('UsersController.getAllUsers/error: ', { err });
    }
  };
}

// service does permissioning - are you allowed ot hit this route?
// users = _.sortBy(users, 'score').reverse();
