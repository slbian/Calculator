import EntityController from './EntityController';

export default class UsersController extends EntityController {
  constructor({ usersService, logger }) {
    super({ logger }); // before I do this constructor, I call parent's constructor
    this.usersService = usersService;
  }

  addUser = async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;

      if (!username || !password) {
        throw this.createErrorInvalidInput('username, password');
      }

      this.logger.trace('RegisterController.addUser/input: ', {
        username,
        password,
      });

      const newUserResponse = await this.usersService.addUser({
        username,
        password,
      });

      if (!newUserResponse) {
        this.logger.trace('RegisterController.addUser/error: ', {
          newUserResponse,
        });
        // throw this.createErrorUnexpected('newUserResponse');
        return res.status(409).send('Username taken');
      }

      this.logger.trace('RegisterController.addUser/output: ', {
        newUserResponse,
      });

      res.json(newUserResponse);
    } catch (err) {
      return res.status(409).send('Username taken');
      // this.logger.trace('RegisterController.addUser/error: ', {
      //   err,
      // });
      // if (err.detail) return err.detail;
    }
  };
}
