import ExecutionsController from '../controllers/ExecutionsController';
import executionsService from './executionsService';
import usersService from './usersService';
import logger from './logger';

// can change dependencies (ie change database) but reuse code
export default new ExecutionsController({ logger, executionsService, usersService});
