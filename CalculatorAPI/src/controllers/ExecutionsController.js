import EntityController from './EntityController';

export default class ExecutionsController extends EntityController {
  constructor({ executionsService, logger }) {
    super({ logger });
    this.executionsService = executionsService;
  }

  recordExecution = async (req, res) => {
    try {
      const actor = req.actor;
      const equation = req.body.displayText;

      // TODO: make logger take in name of the class
      this.logger.trace('ExecutionsController.recordExecution/input: ', {
        actor,
        equation,
      });

      if (!actor || !equation) {
        throw this.createErrorInvalidInput('actor, equation');
      }

      const newExecution = await this.executionsService.recordExecution({
        actor,
        userId: actor.id,
        equation: equation,
      });
      if (!newExecution) {
        throw this.createErrorUnexpected('newExecution');
      }

      this.logger.trace('ExecutionsController.recordExecution/output: ', {
        newExecution,
      });
      res.json(newExecution);
    } catch (err) {
      this.logger.trace('ExecutionsController.recordExecution/error: ', {
        err,
      });
    }
  };
}
