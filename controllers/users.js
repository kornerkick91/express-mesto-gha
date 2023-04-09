const { ERROR_INCORRECT_DATA, ERROR_NOT_FOUND, ERROR_BY_DEFAULT } = require('../utils/constants');
const User = require('../models/user');

const findUser = (user, res) => {
  if (user) {
    return res.send(user);
  }
  return res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден.' });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(ERROR_BY_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => findUser(user, res))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(ERROR_INCORRECT_DATA).send({ message: 'Введен некорректный _id.' });
      }
      return res.status(ERROR_BY_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные при создании профиля.' });
      }
      return res.status(ERROR_BY_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, { name, about }, { new: true, runValidators: true })
    .then((user) => findUser(user, res))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      return res.status(ERROR_BY_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
    });
};

const updateAvatar = (req, res) => {
  const avatar = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(owner, avatar, { new: true, runValidators: true })
    .then((user) => findUser(user, res))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      return res.status(ERROR_BY_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar
};
