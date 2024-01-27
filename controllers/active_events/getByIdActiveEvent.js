const { ValidationError } = require('../../helpers');
const { ActiveEvents } = require('../../models');

const getByIdActiveEvent = async (req, res, next) => {
  const id = req.params.id;
  try {
    const event = await ActiveEvents.findById({ _id: id });
    res.status(200).json(event);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getByIdActiveEvent;
