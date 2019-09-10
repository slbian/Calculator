import argon2 from 'argon2';
import EntityDao from './EntityDao';

export default class UsersDao extends EntityDao {
  constructor({ logger, db, entityName }) {
    super({ logger, db, entityName }); // before I do this constructor, I call parent's constructor
  }

  async updateActiveUserTheme(userId, themeId) {
    try {
      this.logger.trace(this.name + '.updateActiveUserTheme/input ', {
        userId,
        themeId,
      });

      if (!userId || !themeId) {
        this.logger.trace(
          this.name + '.updateActiveUserTheme/error: ',
          userId,
          themeId
        );
        throw this.createErrorInvalidInput('userId, themeId');
      }
      const [user] = await this.db(this.entityName)
        .where('id', userId)
        .update({
          themeId: themeId,
        })
        .returning('*');

      if (!user) {
        this.logger.trace(this.name + '.updateActiveUserTheme/error: ', user);
        throw this.createErrorEntityNotFound('userId');
      }

      delete user.hashedPassword;
      this.logger.trace(this.name + '.updateActiveUserTheme/output: ', {
        user,
      });
      return user;
    } catch (err) {
      this.logger.trace(this.name + '.updateActiveUserTheme/error: ', { err });
    }
  }

  async addUser(username, password) {
    try {
      this.logger.trace(this.name + '.addUser/input ', { username, password });

      if (!username || !password) {
        this.logger.trace(this.name + '.addUser/error: ', {
          username,
          password,
        });
        throw this.createErrorInvalidInput('username, password');
      }

      const now = new Date().toISOString();

      const hashedPassword = await argon2.hash(password);

      const [user] = await this.db(this.entityName)
        .insert({
          username: username,
          created_at: now,
          updated_at: now,
          hashedPassword: hashedPassword,
        })
        .returning('*');

      if (!user) {
        this.logger.trace(this.name + '.addUser/no user: ', { user });
        throw this.createErrorEntityNotFound('userId');
      }

      delete user.hashedPassword;
      this.logger.trace(this.name + '.addUser/output: ', { user });
      return user;
    } catch (err) {
      this.logger.trace(this.name + '.addUser/error: ', { err });
    }
  }

  async getAllUsers() {
    try {
      this.logger.trace(this.name + '.getAllUsers/called');
      let users = await this.db.select('*').from(this.entityName);

      users = users.map(user => {
        delete user.hashedPassword;
        return user;
      });
      this.logger.trace(this.name + '.getAllUsers/output ', users);
      return users;
    } catch (err) {
      this.logger.trace(this.name + '.getAllUsers/error: ', { err });
    }
  }
}
