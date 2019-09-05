import EntityDao from './EntityDao';

export default class ThemesDao extends EntityDao {
  constructor({ logger, db, entityName }) {
    super({ logger, db, entityName }); // before I do this constructor, I call parent's constructor
  }

  async getThemeByThemeId(themeId) {
    try {
      this.logger.trace('ThemesDao.getThemeByUserId/input: ', themeId);
      if (!themeId) {
        throw this.createErrorInvalidInput('userId');
      }
      const [theme] = await this.db
        .select('*')
        .from(this.entityName)
        .where('id', themeId);
      this.logger.trace('ThemesDao.getThemesByUserId/output: ', theme);
      return theme;
    } catch (err) {
      this.logger.trace('ThemesDao.getThemesByUserId/error: ', { err });
    }
  }

  async getAllThemes() {
    try {
      this.logger.trace('ThemesDao.getAllThemes/called');

      const themes = await this.db.select('*').from(this.entityName);
      this.logger.trace('ThemesDao.getAllThemes/output: ', themes);
      return themes;
    } catch (err) {
      this.logger.trace('ThemesDao.getAllThemes/error: ', { err });
    }
  }
}
