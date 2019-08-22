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

  // getThemeByColor(color) {
  //   try {
  //     this.logger.trace('ThemesService.getThemeByColor/input: ', {
  //       actor,
  //       userId,
  //     });
  //     if (!actor || !userId) {
  //       throw this.createErrorInvalidInput('actor, userId');
  //     }
  //     if (actor.id !== userId) {
  //       throw this.createErrorPermissionDenied('actor.id != userId');
  //     }

  //     const theme = this.themesDao.getThemeByThemeId(actor.themeId);

  //     this.logger.trace('ThemesService.getThemeByColor/output: ', theme);
  //     return theme;
  //   } catch (err) {
  //     this.logger.trace('ThemesService.getThemeByColor/error: ', { err });
  //   }
  // }
}
