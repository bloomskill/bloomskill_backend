const { ValidationError } = require('../../helpers');
const { Messages } = require('../../models');

const getMessages = async (req, res, next) => {
  try {
    const messages = await Messages.find();
    res.status(200).json(messages);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getMessages;
