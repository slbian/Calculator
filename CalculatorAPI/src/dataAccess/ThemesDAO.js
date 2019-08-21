import EntityDAO from './EntityDAO';

export default class ThemesDAO extends EntityDAO {
  constructor({ logger, db }) {
    super({ logger, db }); // before I do this constructor, I call parent's constructor
  }

  async getThemeByThemeId(themeId) {
    try {
      this.logger.trace('ThemesDAO.getThemeByUserId/input: ', themeId);
      if (!themeId) {
        throw this.createErrorInvalidInput('userId');
      }
      const [theme] = await this.db
        .select('*')
        .from('themes')
        .where('id', themeId);
      this.logger.trace('ThemesDAO.getThemesByUserId/output: ', theme);
      return theme;
    } catch (err) {
      this.logger.trace('ThemesDAO.getThemesByUserId/error: ', { err });
    }
  }
}
