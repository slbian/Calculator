import ExecutionsController from './ExecutionsController';

// import axios from 'axios';
// import express from 'express';
// let app = express();

// https://jestjs.io/docs/en/expect

describe('addExecution - ExecutionsController', () => {
  // beforeAll(() => {
  //   app.get('/', (req, res) => res.send('Hi there friend'));
  //   return app.listen(100);
  // });

  // afterAll(() => {
  //   try {
  //     app = {};
  //   } catch (e) {
  //     console.log('> > > ', e);
  //   }
  // });

  const executionsService = {
    addExecution: jest.fn(() => new Promise(resolve => resolve(3))),
  };
  const logger = {
    trace: jest.fn(() => {}),
  };
  const executionsController = new ExecutionsController({
    executionsService,
    logger,
  });

  executionsController.createErrorInvalidInput = jest.fn(
    executionsController.createErrorInvalidInput
  );

  const req = { actor: { id: 2 }, body: { displayText: '3+4=' } };
  const res = { json: () => 200, status: () => 500 };
  it('returns as expected', async () => {
    const actual = await executionsController.addExecution(req, res);

    // const response = await axios.get('http://localhost:100/');
    // console.log('>>>>>>>>>>>>>>> ', response.data);

    expect(executionsService.addExecution).toHaveBeenCalledTimes(1);
    expect(executionsService.addExecution).toHaveBeenCalledWith({
      actor: req.actor,
      userId: req.actor.id,
      equation: req.body.displayText,
    });

    expect(actual).toEqual(200);
  });

  it('throws createErrorInvalidInput when no actor on req body', async () => {
    const req = {};
    const actual = await executionsController.addExecution(req, res);
    expect(executionsController.createErrorInvalidInput).toHaveBeenCalledTimes(
      1
    );
    expect(executionsController.createErrorInvalidInput).toHaveBeenCalledWith(
      'actor, equation'
    );
    expect(actual).toEqual(500);
  });
});
