const Joi = require("joi");
const mongoose = require("mongoose");
require("mongoose-type-url");

const eventsValidationSchema = Joi.object({
  article_event: Joi.string().min(1).max(32).required(),
  specialistId: Joi.string().min(1).max(32).required(),
  duration: Joi.string().min(1).max(32).required(),
  category: Joi.string().required(),
  category_second: Joi.string(),
  category_third: Joi.string(),
  rating: Joi.number().min(1).max(10).required(),
  image: Joi.string().uri(),
  image_1: Joi.string().uri(),
  image_2: Joi.string().uri(),
  nameFr: Joi.string().min(1).max(32).required(),
  descriptionFr: Joi.string().min(1).max(132).required(),
  nameUa: Joi.string().min(1).max(32).required(),
  descriptionUa: Joi.string().min(1).max(132).required(),
  nameRu: Joi.string().min(1).max(32).required(),
  descriptionRu: Joi.string().min(1).max(132).required(),
});

const EventsSchema = new mongoose.Schema(
  {
    fr: {
      name: {
        type: String,
        required: [true, "Set name"],
      },
      description: {
        type: String,
        required: [true, "Set description"],
      },
    },
    ua: {
      name: {
        type: String,
        required: [true, "Set name"],
      },
      description: {
        type: String,
        required: [true, "Set description"],
      },
    },
    ru: {
      name: {
        type: String,
        required: [true, "Set name"],
      },
      description: {
        type: String,
        required: [true, "Set description"],
      },
    },
    article_event: {
      type: String,
      required: [true, "Set article_even"],
    },
    specialistId: {
      type: String,
      required: [true, "Set specialistId"],
    },
    duration: {
      type: String,
      required: [true, "Set duration"],
    },
    category: {
      type: String,
      required: [true, "Set category"],
    },
    category_second: {
      type: String,
    },
    category_third: {
      type: String,
    },
    rating: {
      type: Number,
      required: [true, "Set rating"],
    },
    image: {
      type: String,
      default: "",
    },
    image_1: {
      type: String,
      default: "",
    },
    image_2: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Events = mongoose.model("events", EventsSchema);

module.exports = { Events, eventsValidationSchema };
