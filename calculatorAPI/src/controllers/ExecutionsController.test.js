import ExecutionsController from './ExecutionsController';

describe('addExecution - ExecutionsController', () => {
  const newExecution = { id: 3, equation: '3+4' };
  const executionsService = {
    addExecution: jest.fn().mockReturnValue(newExecution),
  };
  const logger = {
    trace: jest.fn().mockReturnValue({}),
  };
  const executionsController = new ExecutionsController({
    executionsService,
    logger,
  });

  executionsController.createErrorInvalidInput = jest.fn(
    executionsController.createErrorInvalidInput
  );
  const mockRequest = fakeReq => fakeReq;
  const mockResponse = () => {
    const res = {};
    // mock return of res to allow for chaining of methods (ex res.status().send().json()...)
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  it('returns as expected', async () => {
    const fakeReq = {
      actor: { id: 2 },
      body: { displayText: '3+4' },
    };
    const req = mockRequest(fakeReq);
    const res = mockResponse(newExecution);
    await executionsController.addExecution(req, res);

    expect(executionsService.addExecution).toHaveBeenCalledTimes(1);
    expect(executionsService.addExecution).toHaveBeenCalledWith({
      actor: req.actor,
      userId: req.actor.id,
      equation: req.body.displayText,
    });

    expect(res.json).toHaveBeenCalledWith(newExecution);
  });

  it('throws createErrorInvalidInput when no actor on req body', async () => {
    const fakeReq = {};
    const req = mockRequest(fakeReq);
    const res = mockResponse();
    await executionsController.addExecution(req, res);
    expect(executionsController.createErrorInvalidInput).toHaveBeenCalledTimes(
      1
    );
    expect(executionsController.createErrorInvalidInput).toHaveBeenCalledWith(
      'actor, equation'
    );
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
