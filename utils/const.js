module.exports.created = 200;
module.exports.URL_REG = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.))(:\d{2,5})?((\/.+)+)?\/?#?/;
module.exports.allowedCors = [
  'https://gaidukevich.movie.nomoredomains.club',
  'http://gaidukevich.movie.nomoredomains.club',
  'gaidukevich.movie.nomoredomains.club',
  'localhost:3001',
  'https://localhost:3001',
  'http://localhost:3001',
];
module.exports.DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
