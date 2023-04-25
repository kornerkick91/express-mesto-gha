const ERROR_INCORRECT_DATA = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_BY_DEFAULT = 500;
const JWT_SECRET = 'super-secret-key';
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

module.exports = {
  ERROR_INCORRECT_DATA,
  ERROR_NOT_FOUND,
  ERROR_BY_DEFAULT,
  urlRegex,
  JWT_SECRET
};
