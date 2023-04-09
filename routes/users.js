const usersRouter = require('express').Router();
const {
  createUser,
  getUsers,
  getUserById
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);

module.exports = usersRouter;
