const Joi = require("joi");
const mongoose = require("mongoose");
require("mongoose-type-email");
require("mongoose-type-url");

const specialistValidationSchema = Joi.object({
  rating: Joi.number().min(0).max(10).required(),
  image: Joi.string().uri(),
  status: Joi.string().min(3).max(32).required(),
  phone: Joi.string().min(3).max(32).required(),
  email: Joi.string().email().required(),
  descriptionFr: Joi.string().min(3).max(400).required(),
  nameFr: Joi.string().min(3).max(60).required(),
  descriptionUa: Joi.string().min(3).max(400).required(),
  nameUa: Joi.string().min(3).max(60).required(),
  descriptionRu: Joi.string().min(3).max(400).required(),
  nameRu: Joi.string().min(3).max(60).required(),
  specialistId: Joi.string(),
});

const specialistsSchema = new mongoose.Schema(
  {
    fr: {
      description: {
        type: String,
        required: [true, "Set title of the spesialist"],
      },
      name: {
        type: String,
        required: [true, "Set name of the spesialist"],
      },
    },
    ua: {
      description: {
        type: String,
        required: [true, "Set title of the spesialist"],
      },
      name: {
        type: String,
        required: [true, "Set name of the spesialist"],
      },
    },
    ru: {
      description: {
        type: String,
        required: [true, "Set title of the spesialist"],
      },
      name: {
        type: String,
        required: [true, "Set name of the spesialist"],
      },
    },
    rating: {
      type: Number,
      required: [true, "Set rating of the spesialist"],
    },
    image: {
      type: mongoose.SchemaTypes.Url,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      required: [true, "Set status of the spesialist"],
    },
    phone: {
      type: String,
      required: [true, "Set phone number"],
    },
    specialistId: {
      type: String,
      required: [true, "Set specialistId"],
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: [true, "Set email user"],
      unique: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Specialists = mongoose.model("specialists", specialistsSchema);

module.exports = { Specialists, specialistValidationSchema };
