const usersRouter = require('express').Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
