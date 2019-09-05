import ExecutionsDao from '../dataAccess/ExecutionsDao';
import db from './db';
import logger from './logger';

// TODO: lowercase Dao
// dependency injection
// entityname is just name of the table
export default new ExecutionsDao({
  logger,
  db,
  entityName: 'executions',
});
