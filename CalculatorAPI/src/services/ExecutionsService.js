// future: add roles? UI dashboard
// any methods that you want for everything should go into Entity
// refactoring is easy - changing a layer is easy
// object oriented - great for tests

import EntityService from './EntityService';

export default class ExecutionsService extends EntityService {
  // TODO: validator - import the instance into the Entity___ classes, assign as properties (this.validateActor...)
  constructor({ executionsDao, logger }) {
    super({ logger }); // before I do this constructor, I call parent's constructor
    this.executionsDao = executionsDao;
  }

  async getScoreByUserId({ actor, userId }) {
    try {
      this.logger.trace('ExecutionsService.getScoreByUserId/input: ', {
        actor,
        userId,
      });
      if (!actor || !userId) {
        throw this.createErrorInvalidInput('actor, userId');
      }
      if (actor.id !== userId) {
        throw this.createErrorPermissionDenied('actor.id != userId');
      }
      const score = await this.executionsDao.getScoreByUserId(userId);
      this.logger.trace('ExecutionsService.getScoreByUserId/output: ', score);
      return score;
    } catch (err) {
      console.log(err);
      this.logger.trace('ExecutionsService.getScoreByUserId/error: ', { err });
    }
  }
}
