// future: add roles? UI dashboard
// any methods that you want for everything should go into Entity
// refactoring is easy - changing a layer is easy
// object oriented - great for tests

import EntityService from './EntityService';

export default class ExecutionsService extends EntityService {
  constructor({ usersDAO, themesDAO, executionsDAO, logger }) {
    super({ logger }); // before I do this constructor, I call parent's constructor
    this.usersDAO = usersDAO;
    this.themesDAO = themesDAO;
    this.executionsDAO = executionsDAO;
  }

  getScoreByUserId({ actor, userId }) {
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
      const score = this.executionsDAO.getScoreByUserId(userId);
      this.logger.trace('ExecutionsService.getScoreByUserId/output: ', score);
      return score;
    } catch (err) {
      this.logger.trace('ExecutionsService.getScoreByUserId/error: ', { err });
    }
  }
}
