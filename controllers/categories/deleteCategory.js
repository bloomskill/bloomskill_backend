const { Categories } = require("../../models");

const deleteCategory = async (req, res, next) => {
  try {
    const { params } = req;
    const id = params.id;

    const category = await Categories.deleteOne({ categoryId: id });
    if (category.deletedCount === 0) {
      return res.status(400).json({ message: `Bad request (id incorrect)` });
    }
    const categories = await Categories.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: `Bad request (id incorrect)` });
  }
};

module.exports = deleteCategory;
