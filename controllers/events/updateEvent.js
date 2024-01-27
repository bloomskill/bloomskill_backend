const { ValidationError, dataFilterObj } = require("../../helpers");
const { Events } = require("../../models");
let path = require("path");

const updateEvent = async (req, res, next) => {
  const { id } = req.params;
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
  } = req.body;

  const updatedData = {
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

  console.log("UPDATE EVENT", updatedData);

  try {
    const resUpdate = await Events.findOneAndUpdate({ article_event: id }, updatedData, {
      new: true,
    });
    const events = await Events.find();
    return res.status(201).json(events);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = updateEvent;
