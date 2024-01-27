const { ValidationError } = require("../../helpers");
const { Orders } = require("../../models");

const get = async (req, res, next) => {
  try {
    const orders = await Orders.find();
    res.status(200).json(orders);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = get;
