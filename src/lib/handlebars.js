const {format} = require('timeago.js');

const helpers = {};

helpers.timeago = (timestamp) => {
  return format(timestamp);
};
// convierte el tiempo de largo a corto

module.exports = helpers; 