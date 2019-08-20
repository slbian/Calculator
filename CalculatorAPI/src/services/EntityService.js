// business logic
// invalid input
// error unexpected
// permission denied

// take inputs defined in controllers and assume it can assume DB in very general ways
// like .queryOne, .queryMany, .insert (all this will be in DB access level)
// permissions - can this person even do this
// formatting - ex. get theme, strip off unecessary info, change types maybe, delete user password
// return just the resource that the controller needs

// controller packages up what services returns, sends it off
export default class EntityService {
  constructor({ logger }) {
    this.logger = logger;
  }

  createErrorInvalidInput(details) {
    return new Error(`INVALID_INPUT / ${details}`);
  }

  createErrorPermissionDenied(details) {
    return new Error(`PERMISSION_DENIED / ${details}`);
  }

  createErrorUnexpected(details) {
    return new Error(`UNEXPECTED_ERROR / ${details}`);
  }
}
