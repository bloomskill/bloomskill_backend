const { ValidationError } = require('../../helpers');
const { Categories } = require('../../models');

const getCategoryById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const category = await Categories.findById({ categoryId: id });
    res.status(200).json(category);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getCategoryById;
