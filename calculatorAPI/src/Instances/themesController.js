import ThemesController from '../controllers/ThemesController';
import themesService from './themesService';
import logger from './logger';

// can change dependencies (ie change database) but reuse code
export default new ThemesController({
  logger,
  themesService,
});
