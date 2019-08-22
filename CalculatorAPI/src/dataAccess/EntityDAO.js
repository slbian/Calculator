export default class EntityDAO {
  constructor({ logger, db, entityName }) {
    this.logger = logger;
    this.db = db;
    this.entityName = entityName;
  }

  // getById

  // column does not exist
  createErrorInvalidInput(details) {
    return new Error(`INVALID_INPUT / ${details}`);
  }

  // get back NULL
  createErrorEntityNotFound(details) {
    return new Error(`ENTITY_NOT_FOUND / ${details}`);
  }

  // db down, network down
  createErrorUnexpected(details) {
    return new Error(`UNEXPECTED_ERROR / ${details}`);
  }
}
