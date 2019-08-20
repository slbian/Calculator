import EntityController from './EntityController';

export default class ExecutionsController extends EntityController {
  constructor({ usersService, themesService, executionsService, logger }) {
    super({ logger }); // before I do this constructor, I call parent's constructor
    this.usersService = usersService;
    this.themesService = themesService;
    this.executionsService = executionsService;
  }

  recordNewScore = (req, res) => {
    try {
      // get the user, their score, their theme, their last login
      const actor = req.actor;
      const equation = req.body.displayText;

      // TODO: make logger take in name of the class
      this.logger.trace('ExecutionsController.getActiveUser/input: ', {
        actor,
        equation,
      });

      if (!actor) {
        throw this.createErrorInvalidInput('actor');
      }

      const user = this.usersService.getActiveUser({ actor });
      if (!user) {
        throw this.createErrorUnexpected('user');
      }

      user.score = this.executionsService.getScoreByUserId({
        actor,
        userId: actor.id,
      });
      if (!user.score) {
        throw this.createErrorUnexpected('score');
      }

      user.theme = this.themesService.getThemeById({
        actor,
        themeId: actor.themeId,
      });
      if (!user.theme) {
        throw this.createErrorUnexpected('theme');
      }

      this.logger.trace('ExecutionsController.getActiveUser/output: ', {
        user,
      });
      res.json(user);
    } catch (err) {
      this.logger.trace('ExecutionsController.getActiveUser/error: ', { err });
    }
  };
}
