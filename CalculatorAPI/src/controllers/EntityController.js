export default class EntityController {
  constructor({ logger }) {
    this.logger = logger;
  }

  createErrorInvalidInput(details) {
    return new Error(`INVALID_INPUT / ${details}`);
  }

  createErrorUnexpected(details) {
    return new Error(`UNEXPECTED_ERROR / ${details}`);
  }
}
