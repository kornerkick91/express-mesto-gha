const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '64331c7f2d14b999a71f30cd'
  };

  next();
});

app.use(router);

app.use((req, res) => {
  res.status(404).send({ message: 'Был запрошен несуществующий роут.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
