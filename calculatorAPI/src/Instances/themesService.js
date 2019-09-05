import ThemesService from '../services/ThemesService';
import themesDao from './ThemesDao';
import logger from './logger';

export default new ThemesService({ logger, themesDao });
