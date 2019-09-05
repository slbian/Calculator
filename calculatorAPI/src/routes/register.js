import * as express from 'express';
import registerController from '../Instances/registerController';

const router = express.Router();

router.post('/', registerController.addUser);

export default router;
