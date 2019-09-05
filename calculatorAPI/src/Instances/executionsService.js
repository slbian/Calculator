import ExecutionsService from '../services/ExecutionsService';
import executionsDao from './executionsDao';
import logger from './logger';

export default new ExecutionsService({ logger, executionsDao });
