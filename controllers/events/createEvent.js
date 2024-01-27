const { ValidationError, dataFilterObj } = require("../../helpers");
const { Events } = require("../../models");
let path = require("path");

const createEvent = async (req, res, next) => {
  // const newData = dataFilterObj(req.body);
  const {
    image,    
    image_1,
    image_2,
    nameFr,
    descriptionFr,
    nameUa,
    descriptionUa,
    nameRu,
    descriptionRu,
    specialistId,
    duration,
    category,
    category_second,
    category_third,
    rating,
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
    image,
    image_1,
    image_2,
    specialistId,
    duration,
    category,
    category_second,
    category_third,
    rating,
    article_event: id,
  };

  console.log("CREATE EVENT:", newData);

  try {
    const resCreate = await Events.create(newData);
    const events = await Events.find();
    return res.status(201).json(events);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = createEvent;
