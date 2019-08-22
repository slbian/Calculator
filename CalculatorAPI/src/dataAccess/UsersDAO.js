import EntityDao from './EntityDao';

export default class UsersDao extends EntityDao {
  constructor({ logger, db, entityName }) {
    super({ logger, db, entityName }); // before I do this constructor, I call parent's constructor
  }

  async updateThemeByUserId(userId) {
    try {
      return userId;
    } catch (err) {
      this.logger.trace('UsersDao.updateThemeByUserId/error: ', { err });
    }
  }

  async getAllUsers() {
    try {
      this.logger.trace('UsersDao.getAllUsers/called');
      let users = await this.db.select('*').from(this.entityName);

      users = users.map(user => {
        delete user.hashedPassword;
        return user;
      });
      this.logger.trace('UsersDao.getAllUsers/output ', users);
      return users;
    } catch (err) {
      this.logger.trace('UsersDao.getAllUsers/error: ', { err });
    }
  }
}
