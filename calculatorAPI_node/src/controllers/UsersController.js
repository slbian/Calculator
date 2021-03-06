import { sortBy } from 'lodash';

import EntityController from './EntityController';

export default class UsersController extends EntityController {
  constructor({ usersService, themesService, executionsService, logger }) {
    super({ logger }); // before I do this constructor, I call parent's constructor
    this.usersService = usersService;
    this.themesService = themesService;
    this.executionsService = executionsService;
  }

  // all we send is a token, we just get back the user who is logged in
  // strictly packaging + http management (request, response) - lower levels doesn't know abt express
  getActiveUser = async (req, res) => {
    // route: "/active"
    try {
      const actor = req.actor;

      // TODO: make logger take in name of the class
      this.logger.trace('UsersController.getActiveUser/input: ', { actor });

      if (!actor) {
        throw this.createErrorInvalidInput('actor');
      }

      const user = actor;

      user.score = await this.executionsService.getScoreByUserId({
        actor,
        userId: actor.id,
      });

      if (user.score === undefined) {
        throw this.createErrorUnexpected('score'); // TODO: errors dont actually show up
      }

      user.theme = await this.themesService.getThemeByUserId({
        actor,
        userId: actor.id,
      });
      if (!user.theme) {
        throw this.createErrorUnexpected('theme');
      }

      this.logger.trace('UsersController.getActiveUser/output: ', { user });
      return res.json(user);
    } catch (err) {
      this.logger.trace('UsersController.getActiveUser/error: ', { err });
      return res.status(500);
    }
  };

  updateActiveUserTheme = async (req, res) => {
    // route "/changeTheme"
    try {
      const actor = req.actor;
      const themeId = req.query ? req.query.themeId : undefined; // new color

      this.logger.trace('UsersController.updateActiveUserTheme/input: ', {
        actor,
        themeId,
      });

      if (actor === undefined || themeId === undefined) {
        throw this.createErrorInvalidInput('actor, themeId');
      }

      const newThemeSuccess = await this.usersService.updateActiveUserTheme({
        actor,
        userId: actor.id,
        themeId: themeId,
      });
      if (!newThemeSuccess) {
        this.logger.trace('UsersController.updateActiveUserTheme/error: ', {
          newThemeSuccess,
        });
        throw this.createErrorUnexpected('newThemeSuccess');
      }

      this.logger.trace('UsersController.updateActiveUserTheme/output: ', {
        newThemeSuccess,
      });
      return res.json(newThemeSuccess);
    } catch (err) {
      this.logger.trace('UsersController.updateActiveUserTheme/error: ', {
        err,
      });
      return res.status(500);
    }
  };

  getAllUsers = async (req, res) => {
    // route: "/"
    try {
      const actor = req.actor;

      // TODO: make logger take in name of the class
      this.logger.trace('UsersController.getAllUsers/input: ', {
        actor,
      });

      if (!actor) {
        throw this.createErrorInvalidInput('actor');
      }

      const allUsers = await this.usersService.getAllUsers({
        actor,
        userId: actor.id,
      });
      if (!allUsers) {
        throw this.createErrorUnexpected('allUsers');
      }

      const orderedUsers = sortBy(allUsers, 'score').reverse();

      this.logger.trace('UsersController.getAllUsers/output: ', {
        orderedUsers,
      });
      return res.json(orderedUsers);
    } catch (err) {
      this.logger.trace('UsersController.getAllUsers/error: ', err);
      return res.status(500);
    }
  };
}
