import RegisterController from '../controllers/RegisterController';
import usersService from './usersService';
import logger from './logger';

export default new RegisterController({ logger, usersService });
