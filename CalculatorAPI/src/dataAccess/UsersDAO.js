import EntityDAO from './EntityDAO';

export default class UsersDAO extends EntityDAO {
  constructor({ logger, db }) {
    super({ logger, db }); // before I do this constructor, I call parent's constructor
  }

  async updateThemeByUserId(userId, color) {
    try {
      return userId;
    } catch (err) {
      this.logger.trace('UsersDAO.updateThemeByUserId/error: ', { err });
    }
  }

  async getAllUsers() {
    try {
      let users = await this.db.select('*').from('users');

      users = users.map(user => {
        delete user.hashedPassword;
        return user;
      });

      return users;
    } catch (err) {
      this.logger.trace('UsersDAO.updateThemeByUserId/error: ', { err });
    }
  }
}
