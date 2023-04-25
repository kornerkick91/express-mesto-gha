const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const sign = require('./routes/auth');
const auth = require('./middlewares/auth');
const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sign);
app.use(auth);
app.use(router);

app.use(errors());

app.use((req, res) => {
  res.status(404).send({ message: 'Был запрошен несуществующий роут.' });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message
  });

  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
