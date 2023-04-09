const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', putLikeCard);
cardsRouter.delete('/:cardId/likes', deleteLikeCard);

module.exports = cardsRouter;
