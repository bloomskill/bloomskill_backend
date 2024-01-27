const { ValidationError, dataFilterObj } = require("../../helpers");
const { Categories } = require("../../models");
// let path = require('path');

const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { nameFr, nameUa, nameRu } = req.body;

  const updatedData = {
    categoryId: id,
    fr: {
      title: nameFr,
    },
    ua: {
      title: nameUa,
    },
    ru: {
      title: nameRu,
    },
  };

  console.log("UPDATE CATEGORY", updatedData);

  try {
    const resUpdate = await Categories.findOneAndUpdate(
      { categoryId: id },
      updatedData,
      {
        new: true,
      }
    );
    const categories = await Categories.find();
    res.status(201).json(categories);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = updateCategory;
