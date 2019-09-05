import ThemesDao from '../dataAccess/ThemesDao';
import db from './db';
import logger from './logger';

export default new ThemesDao({ logger, db, entityName: 'themes' });
