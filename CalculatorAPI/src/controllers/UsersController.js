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
}

// service does permissioning - are you allowed ot hit this route?
