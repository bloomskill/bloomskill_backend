const auth = require('./auth');
const users = require('./users');
const events = require('./events');
const active_events = require('./active_events');
const categories = require('./categories');
const specialists = require('./specialists');
const orders = require('./orders');
const messages = require('./messages');

module.exports = {
  auth,
  users,
  events,
  active_events,
  categories,
  specialists,
  orders,
  messages,
};
