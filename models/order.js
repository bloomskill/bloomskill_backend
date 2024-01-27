const Joi = require("joi");
const mongoose = require("mongoose");
require("mongoose-type-email");

const ordersValidationSchema = Joi.object({
  eventId: Joi.string().min(3).max(32).required(),
  activeEventID: Joi.string().min(3).max(32).required(),
  date: Joi.date().required(),
  time: Joi.string(),
  userName: Joi.string().min(3).max(32).required(),
  userEmail: Joi.string().email().required(),
  bookingSeats: Joi.number().required(),
  priceTotal: Joi.number().required(),
  status: Joi.string().min(3).max(32).required(),
});

const ordersSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: [true, "Set eventId"],
    },
    activeEventID: {
      type: String,
      required: [true, "Set activeEventID"],
    },
    date: {
      type: Date,
      required: [true, "Set date"],
    },
    time: {
      type: String,
    },
    userName: {
      type: String,
      required: [true, "Set userName"],
    },
    userEmail: {
      type: mongoose.SchemaTypes.Email,
      required: [true, "Set email user"],
    },
    bookingSeats: {
      type: Number,
      required: [true, "Set bookingSeats"],
    },
    priceTotal: {
      type: Number,
      required: [true, "Set priceTotal"],
    },
    status: {
      type: String,
      default: "new",
      enum: ["new", "accept", "reject"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Orders = mongoose.model("orders", ordersSchema);

module.exports = { Orders, ordersValidationSchema };
