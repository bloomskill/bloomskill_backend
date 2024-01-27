const { ValidationError } = require('../../helpers');
const { Messages } = require('../../models');

const getMessageById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const message = await Messages.findById({ _id: id });
    res.status(200).json(message);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getMessageById;
