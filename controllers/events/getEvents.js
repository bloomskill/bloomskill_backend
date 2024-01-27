const { ValidationError } = require('../../helpers');
const { Events } = require('../../models');

const getEvents = async (req, res, next) => {
  try {
    const services = await Events.find().sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = getEvents;
