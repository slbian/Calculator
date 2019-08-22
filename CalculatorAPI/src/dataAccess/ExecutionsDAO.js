// EntityDao has method that has getById
// ExecutionsDao extends EntityDao
//  inject database client into constructor; this.db=db
// DAO just checks for inputs, doesnt care abt permissions
// has own try catch - like entitynotfound, or if db is down..
// EntityDAO should have different kinds of errors
// invalidinputs (column doesn't exist), entitynotfound (get back null),
import EntityDAO from './EntityDAO';

export default class ExecutionsDAO extends EntityDAO {
  constructor({ logger, db, entityName }) {
    super({ logger, db, entityName }); // before I do this constructor, I call parent's constructor
  }

  async getScoreByUserId(userId) {
    try {
      this.logger.trace('ExecutionsDAO.getScoreByUserId/input: ', userId);
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
      this.logger.trace('ExecutionsDAO.getScoreByUserId/output: ', score);
      return score;
    } catch (err) {
      this.logger.trace('ExecutionsDAO.getScoreByUserId/error: ', { err });
    }
  }

  async recordEquation(userId, equation) {
    try {
      this.logger.trace(
        'ExecutionsDAO.recordEquation/input: ',
        userId,
        equation
      );
      if (!userId) {
        throw this.createErrorInvalidInput('userId');
      }

      const [executions] = await this.db(this.entityName)
        .insert({
          equation: equation,
          score: Number(eval(equation).toString().length),
          userId: userId,
        })
        .returning('*');

      this.logger.trace('ExecutionsDAO.recordEquation/output: ', executions);
      return executions;
    } catch (err) {
      this.logger.trace('ExecutionsDAO.recordEquation/error: ', { err });
    }
  }
}
