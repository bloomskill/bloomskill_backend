const { ValidationError } = require("../../helpers");
const { Categories } = require("../../models");

const createCategory = async (req, res, next) => {
  const { nameFr, nameUa, nameRu, id } = req.body;

  const newData = {
    fr: {
      title: nameFr,
    },
    ua: {
      title: nameUa,
    },
    ru: {
      title: nameRu,
    },
    categoryId: id,
  };

  console.log("CREATE Category:", newData);
  try {
    const resCreate = await Categories.create(newData);
    const categories = await Categories.find();
    res.status(200).json(categories);
    return res.status(201).json(categories);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = createCategory;
