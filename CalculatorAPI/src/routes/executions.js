import * as express from 'express';
import executionsController from '../Instances/ExecutionsController';

const router = express.Router();

router.post('/', executionsController.recordExecution);
//   async (req, res) => {
//   logger.trace('user and equation:', req.body);
//   const equation = req.body.displayText;

//   let user = req.actor;

//   delete user.hashedPassword;

//   await db('executions')
//     .insert({
//       equation: equation,
//       score: Number(eval(equation).toString().length),
//       userId: user.id,
//     })
//     .returning('*');

//   let [score] = await db
//     .select('userId')
//     .sum('score')
//     .from('executions')
//     .groupBy('userId')
//     .where('userId', user.id);

//   let newScore = score.sum;

//   let [theme] = await db
//     .select('*')
//     .from('themes')
//     .where('id', user.themeId);

//   logger.trace('user and new score:', `${user.username} ${newScore}`);

//   res.json({ ...user, newScore, theme });
// });

export default router;
