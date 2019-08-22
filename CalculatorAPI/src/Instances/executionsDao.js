import ExecutionsDao from '../dataAccess/ExecutionsDAO';
import db from './db';
import logger from './logger';

// TODO: lowercase DAO
// dependency injection
// entityname is just name of the table
export default new ExecutionsDao({ logger, db, entityName: 'executions' });
