import { io } from "../index";
import { sortBy } from 'lodash';

import EntityController from './EntityController';


export default class ExecutionsController extends EntityController {
  constructor({ executionsService, usersService, logger }) {
    super({ logger });
    this.executionsService = executionsService;
    this.usersService = usersService;
  }

  addExecution = async (req, res) => {
    try {
      const actor = req.actor;
      const equation = req.body ? req.body.displayText : undefined; //TODO: lodas

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
      
      const allUsers = await this.usersService.getAllUsers({
        actor,
        userId: actor.id,
      });
      if (!allUsers) {
        throw this.createErrorUnexpected('allUsers');
      }

      const orderedUsers = sortBy(allUsers, 'score').reverse();

      this.logger.trace('ExecutionsController.addExecution/output: ', {
        newExecution,
      });
      
      io.sockets.emit("update-scoreboard", {
        users: orderedUsers,
      });
      
      return res.status(200).json(newExecution);
    } catch (err) {
      this.logger.trace('ExecutionsController.addExecution/error: ', {
        err,
      });
      return res.status(500);
    }
  };
}
