const {
  Users,
  userValidationSchema,
  userUpdateValidationSchema,
  userEditValidationSchema,
  userRegistationSchema,
} = require('./user');
const { Categories, categoriesValidationSchema } = require('./category');
const { Events, eventsValidationSchema } = require('./event');
const { ActiveEvents, activeEventsValidationSchema } = require('./activeEvent');
const { Specialists, specialistValidationSchema } = require('./specialist');
const { Orders, ordersValidationSchema } = require('./order');
const { Messages, messagesValidationSchema } = require('./message');

module.exports = {
  Users,
  userValidationSchema,
  userUpdateValidationSchema,
  userEditValidationSchema,
  Categories,
  categoriesValidationSchema,
  Events,
  eventsValidationSchema,
  userRegistationSchema,
  Specialists,
  specialistValidationSchema,
  ActiveEvents,
  activeEventsValidationSchema,
  Orders,
  ordersValidationSchema,
  Messages,
  messagesValidationSchema,
};
