// EntityDao has method that has getById
// ExecutionsDao extends EntityDao
//  inject database client into constructor; this.db=db
// Dao just checks for inputs, doesnt care abt permissions
// has own try catch - like entitynotfound, or if db is down..
// EntityDao should have different kinds of errors
// invalidinputs (column doesn't exist), entitynotfound (get back null),
import EntityDao from './EntityDao';

export default class ExecutionsDao extends EntityDao {
  constructor({ logger, db, entityName }) {
    super({ logger, db, entityName }); // before I do this constructor, I call parent's constructor
  }

  async getScoreByUserId(userId) {
    try {
      this.logger.trace('ExecutionsDao.getScoreByUserId/input: ', userId);
      if (!userId) {
        throw this.createErrorInvalidInput('userId');
      }
      const [scores] = await this.db
        .select('userId')
        .sum('score')
        .from(this.entityName)
        .groupBy('userId')
        .where('userId', userId);

      const score = scores.sum;
      this.logger.trace('ExecutionsDao.getScoreByUserId/output: ', score);
      return score;
    } catch (err) {
      this.logger.trace('ExecutionsDao.getScoreByUserId/error: ', { err });
    }
  }

  async getAllScores() {
    try {
      this.logger.trace('ExecutionsDao.getAllScores/called');
      const score = await this.db
        .select('userId')
        .sum('score')
        .from(this.entityName)
        .groupBy('userId');

      this.logger.trace('ExecutionsDao.getAllScores/output: ', score);
      return score;
    } catch (err) {
      this.logger.trace('ExecutionsDao.getAllScores/error: ', { err });
    }
  }

  async recordExecution(userId, equation) {
    try {
      this.logger.trace(
        'ExecutionsDao.recordEquation/input: ',
        userId,
        equation
      );
      if (!userId || !equation) {
        throw this.createErrorInvalidInput('userId, equation');
      }

      const [executions] = await this.db(this.entityName)
        .insert({
          equation: equation,
          score: Number(eval(equation).toString().length),
          userId: userId,
        })
        .returning('*');

      this.logger.trace('ExecutionsDao.recordEquation/output: ', executions);
      return executions;
    } catch (err) {
      this.logger.trace('ExecutionsDao.recordEquation/error: ', { err });
    }
  }
}
