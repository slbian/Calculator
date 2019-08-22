import UsersService from '../services/UsersService';
import usersDao from './usersDao';
import themesDao from './themesDao';
import executionsDao from './executionsDao';
import logger from './logger';

export default new UsersService({ logger, usersDao, themesDao, executionsDao });
