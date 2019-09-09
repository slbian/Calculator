import EntityController from './EntityController';

export default class ExecutionsController extends EntityController {
  constructor({ executionsService, logger }) {
    super({ logger });
    this.executionsService = executionsService;
  }

  addExecution = async (req, res) => {
    try {
      const actor = req.actor;
      const equation = req.body ? req.body.displayText : undefined;

      // TODO: make logger take in name of the class
      this.logger.trace('ExecutionsController.addExecution/input: ', {
        actor,
        equation,
      });

      if (!actor || !equation) {
        throw this.createErrorInvalidInput('actor, equation');
      }

      const newExecution = await this.executionsService.addExecution({
        actor,
        userId: actor.id,
        equation: equation,
      });
      if (!newExecution) {
        throw this.createErrorUnexpected('newExecution');
      }

      this.logger.trace('ExecutionsController.addExecution/output: ', {
        newExecution,
      });
      return res.json(newExecution);
    } catch (err) {
      this.logger.trace('ExecutionsController.addExecution/error: ', {
        err,
      });
      return res.status(500);
    }
  };
}
