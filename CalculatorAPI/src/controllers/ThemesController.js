import EntityController from './EntityController';

export default class ThemesController extends EntityController {
  constructor({ usersService, themesService, executionsService, logger }) {
    super({ logger }); // before I do this constructor, I call parent's constructor
    this.usersService = usersService;
    this.themesService = themesService;
    this.executionsService = executionsService;
  }

  changeTheme = (req, res) => {
    try {
      // get the user, their score, their theme, their last login
      const actor = req.actor;

      // TODO: make logger take in name of the class
      this.logger.trace('ThemesController.getThemeByUser/input: ', { actor });

      if (!actor) {
        throw this.createErrorInvalidInput('actor');
      }

      const user = this.usersService.getActiveUser({ actor });
      if (!user) {
        throw this.createErrorUnexpected('user');
      }

      user.theme = this.themesService.getThemeById({
        actor,
        themeId: actor.themeId,
      });
      if (!user.theme) {
        throw this.createErrorUnexpected('theme');
      }

      const updatedUser = this.themesService.changeThemeByUserId(actor.themeId);

      if (!updatedUser) {
        throw this.createErrorUnexpected('theme');
      }

      this.logger.trace('ThemesController.getThemeByUser/output: ', {
        updatedUser,
      });
      res.json(updatedUser);
    } catch (err) {
      this.logger.trace('ThemesController.getThemeByUser/error: ', { err });
    }
  };
}
