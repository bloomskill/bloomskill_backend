const Joi = require("joi");
const mongoose = require("mongoose");

const categoriesValidationSchema = Joi.object({
  titleFr: Joi.string().min(3).max(32).required(),
  titleUa: Joi.string().min(3).max(32).required(),
  titleRu: Joi.string().min(3).max(32).required(),
  categoryId: Joi.string().required(),
});

const categoriesSchema = new mongoose.Schema(
  {
    fr: {
      title: {
        type: String,
        required: [true, "Set title of the category"],
    },
  },
    ua: {
      title: {
        type: String,
        required: [true, "Set title of the category"],
      },
    },
    ru: {
      title: {
        type: String,
        required: [true, "Set title of the category"],
      },
    },
    categoryId : {
      type: String,
      required: [true, "Set categoryId"],
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Categories = mongoose.model("categories", categoriesSchema);

module.exports = { Categories, categoriesValidationSchema };
