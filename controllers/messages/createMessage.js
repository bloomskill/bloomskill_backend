const { ValidationError } = require('../../helpers');
const { Messages } = require('../../models');

const createMessage = async (req, res, next) => {
  try {
    const resCreate = await Messages.create(req.body);
    return res.status(201).json(resCreate);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = createMessage;
