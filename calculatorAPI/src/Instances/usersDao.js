import UsersDao from '../dataAccess/UsersDao';
import db from './db';
import logger from './logger';

export default new UsersDao({ logger, db, entityName: 'users' });
