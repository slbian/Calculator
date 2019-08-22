import EntityController from './EntityController';

export default class ThemesController extends EntityController {
  constructor({ themesService, logger }) {
    super({ logger });
    this.themesService = themesService;
  }

  getAllThemes = async (req, res) => {
    try {
      // get the user, their score, their theme, their last login
      const actor = req.actor;

      // TODO: make logger take in name of the class
      this.logger.trace('ThemesController.getAllThemes/input: ', {
        actor,
      });

      if (!actor) {
        throw this.createErrorInvalidInput('actor');
      }

      const allThemes = await this.themesService.getAllThemes({
        actor,
        userId: actor.id,
      });
      if (!allThemes) {
        throw this.createErrorUnexpected('allThemes');
      }

      this.logger.trace('ThemesController.getAllThemes/output: ', {
        allThemes,
      });
      res.json(allThemes);
    } catch (err) {
      this.logger.trace('ThemesController.getAllThemes/error: ', {
        err,
      });
    }
  };
}
