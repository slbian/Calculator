import EntityService from './EntityService';

export default class ThemesService extends EntityService {
  constructor({ themesDAO, logger }) {
    super({ logger }); // before I do this constructor, I call parent's constructor
    this.themesDAO = themesDAO;
  }

  getThemeByUserId({ actor, userId }) {
    try {
      this.logger.trace('ThemesService.getThemeByUserId/input: ', {
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

      this.logger.trace('ThemesService.getThemeByUserId/output: ', theme);
      return theme;
    } catch (err) {
      this.logger.trace('ThemesService.getThemeByUserId/error: ', { err });
    }
  }
}
