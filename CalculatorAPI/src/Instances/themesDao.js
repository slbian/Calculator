import ThemesDao from '../dataAccess/ThemesDAO';
import db from './db';
import logger from './logger';

export default new ThemesDao({ logger, db, entityName: 'themes' });
