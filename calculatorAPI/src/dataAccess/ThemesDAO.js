import EntityDao from './EntityDao';

export default class ThemesDao extends EntityDao {
  constructor({ logger, db, entityName }) {
    super({ logger, db, entityName }); // before I do this constructor, I call parent's constructor
  }

  async getThemeByThemeId(themeId) {
    try {
      this.logger.trace(this.name + '.getThemeByUserId/input: ', themeId);
      if (!themeId) {
        throw this.createErrorInvalidInput('userId');
      }
      const [theme] = await this.db
        .select('*')
        .from(this.entityName)
        .where('id', themeId);
      this.logger.trace(this.name + '.getThemesByUserId/output: ', theme);
      return theme;
    } catch (err) {
      this.logger.trace(this.name + '.getThemesByUserId/error: ', { err });
      throw err;
    }
  }

  async getAllThemes() {
    try {
      this.logger.trace(this.name + '.getAllThemes/called');

      const themes = await this.db.select('*').from(this.entityName);
      this.logger.trace(this.name + '.getAllThemes/output: ', themes);
      return themes;
    } catch (err) {
      this.logger.trace(this.name + '.getAllThemes/error: ', { err });
      throw err;
    }
  }
}
