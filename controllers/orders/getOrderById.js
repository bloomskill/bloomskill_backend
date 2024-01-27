const { ValidationError } = require('../../helpers');
const { Orders } = require('../../models');

const getOrderById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const order = await Orders.findById({ _id: id });
    res.status(200).json(order);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getOrderById;
