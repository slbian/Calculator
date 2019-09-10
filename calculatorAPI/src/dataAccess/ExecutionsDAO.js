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
  name = this.constructor.name;

  async getScoreByUserId(userId) {
    try {
      this.logger.trace(this.name + '.getScoreByUserId/input: ', userId);
      if (!userId) {
        throw this.createErrorInvalidInput('userId');
      }
      const [scores] = await this.db
        .select('userId')
        .sum('score')
        .from(this.entityName)
        .groupBy('userId')
        .where('userId', userId);

      if (!scores) {
        this.logger.trace(this.name + '.getScoreByUserId/output: ', 0);
        return 0;
      }
      const score = scores.sum;

      this.logger.trace(this.name + '.getScoreByUserId/output: ', score);

      return score;
    } catch (err) {
      this.logger.trace(this.name + '.getScoreByUserId/error: ', { err });
      throw err;
    }
  }

  async getAllScores() {
    try {
      this.logger.trace(this.name + '.getAllScores/called');
      const scores = await this.db
        .select('userId')
        .sum('score')
        .from(this.entityName)
        .groupBy('userId');

      this.logger.trace(this.name + '.getAllScores/output: ', scores);
      return scores;
    } catch (err) {
      this.logger.trace(this.name + '.getAllScores/error: ', { err });
      throw err;
    }
  }

  async addExecution(userId, equation) {
    try {
      this.logger.trace(
        this.name + '.recordEquation/input: ',
        userId,
        equation
      );
      if (!userId || !equation) {
        throw this.createErrorInvalidInput('userId, equation');
      }
      const executions = await this.db(this.entityName)
        .insert({
          userId: userId,
          equation: equation,
          score: Number(eval(equation).toString().length),
        })
        .returning('*');
      if (!executions) {
        throw this.createErrorEntityNotFound('insert execution');
      }
      this.logger.trace(this.name + '.recordEquation/output: ', executions);
      return executions;
    } catch (err) {
      this.logger.trace(this.name + '.recordEquation/error: ', { err });
      throw err;
    }
  }
}
