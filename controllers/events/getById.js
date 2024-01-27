const { ValidationError } = require('../../helpers');
const { Events } = require('../../models');

const getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const event = await Events.findOne({ article_event: id });
    res.status(200).json(event);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getById;
