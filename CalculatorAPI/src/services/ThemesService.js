import EntityService from './EntityService';

export default class ThemesService extends EntityService {
  constructor({ logger, themesDao }) {
    super({ logger }); // before I do this constructor, I call parent's constructor
    this.themesDao = themesDao;
  }

  async getThemeByUserId({ actor, userId }) {
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

      const theme = await this.themesDao.getThemeByThemeId(actor.themeId);

      this.logger.trace('ThemesService.getThemeByUserId/output: ', theme);
      return theme;
    } catch (err) {
      this.logger.trace('ThemesService.getThemeByUserId/error: ', { err });
    }
  }

  async getThemeByColor({ actor, userId, color }) {
    try {
      this.logger.trace('ThemesService.getThemeByColor/input: ', {
        actor,
        userId,
        color,
      });
      if (!actor || !userId || !color) {
        throw this.createErrorInvalidInput('actor, userId, color');
      }
      if (actor.id !== userId) {
        throw this.createErrorPermissionDenied('actor.id != userId');
      }

      const theme = await this.themesDao.getThemeByThemeId(actor.themeId);
      if (!theme) {
        throw this.createErrorUnexpected('getThemeByTHemeId');
      }

      this.logger.trace('ThemesService.getThemeByColor/output: ', theme);
      return theme;
    } catch (err) {
      this.logger.trace('ThemesService.getThemeByColor/error: ', { err });
    }
  }

  async getAllThemes({ actor, userId }) {
    try {
      this.logger.trace('ThemesService.getAllThemes/input: ', {
        actor,
        userId,
      });
      if (!actor || !userId) {
        throw this.createErrorInvalidInput('actor, userId');
      }
      if (actor.id !== userId) {
        throw this.createErrorPermissionDenied('actor.id != userId');
      }

      const themes = await this.themesDao.getAllThemes();
      if (!themes) {
        this.logger.trace('ThemesService.getAllThemes/ themes error: ', {
          themes,
        });
        throw this.createErrorUnexpected('getAllThemes');
      }

      this.logger.trace('ThemesService.getAllThemes/output: ', { themes });
      return themes;
    } catch (err) {
      this.logger.trace('ThemesService.getAllThemes/error: ', { err });
    }
  }
}
