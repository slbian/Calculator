import UsersController from '../controllers/UsersController';
import themesService from './themesService';
import executionsService from './executionsService';
import usersService from './usersService';
import logger from './logger';

// can change dependencies (ie change database) but reuse code
export default new UsersController({
  logger,
  usersService,
  themesService,
  executionsService,
});
