const { ValidationError } = require("../../helpers");
const { Categories } = require("../../models");

const get = async (req, res, next) => {
  try {
    const categories = await Categories.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = get;
