const { ERROR_INCORRECT_DATA, ERROR_NOT_FOUND, ERROR_BY_DEFAULT } = require('../utils/constants');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(ERROR_BY_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR_INCORRECT_DATA).send({ message: 'Переданы некорректные данные при создании карточки.' });
      }
      return res.status(ERROR_BY_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.deleteOne({ _id: cardId })
    .then((card) => {
      if (card.deletedCount === 0) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена.' });
      }
      return res.send({ message: 'Карточка удалена!' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(ERROR_INCORRECT_DATA).send({ message: 'Введен некорректный _id.' });
      }
      return res.status(ERROR_BY_DEFAULT).send({ message: 'На сервере произошла ошибка.' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard
};
