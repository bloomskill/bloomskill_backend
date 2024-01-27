const { ValidationError } = require("../../helpers");
const { Specialists } = require("../../models");

const createSpecialist = async (req, res, next) => {
  const {
    rating,
    image,
    status,
    phone,
    email,
    descriptionFr,
    nameFr,
    descriptionUa,
    nameUa,
    descriptionRu,
    nameRu,
    id,
  } = req.body;

  const newData = {
    fr: {
      description: descriptionFr,
      name: nameFr,
    },
    ua: {
      description: descriptionUa,
      name: nameUa,
    },
    ru: {
      description: descriptionRu,
      name: nameRu,
    },
    rating,
    image,
    status,
    phone,
    email,
    specialistId : id,

  };
  console.log("CREATE Specialist:", newData);
  try {
    const resCreate = await Specialists.create(newData);
    const specialists = await Specialists.find();
    return res.status(201).json(specialists);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = createSpecialist;
