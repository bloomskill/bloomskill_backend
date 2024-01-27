const { ValidationError, dataFilterObj } = require("../../helpers");
const { ActiveEvents } = require("../../models");
let path = require("path");

const updateActiveEvent = async (req, res, next) => {
  const { id } = req.params;
  const {
    eventId,
    date,
    time,
    price,
    seats,
    booking,
    vacancies,
    language,
    language_secondary,
    language_third,
    location,
    address,
    status,
  } = req.body;

  const updatedData = {
    location,
    address,
    article_eventID: id,
    eventId,
    date,
    time,
    price,
    seats,
    booking,
    vacancies,
    language,
    language_secondary,
    language_third,
    status
  };
  try {
    const resUpdate = await ActiveEvents.findOneAndUpdate({ article_eventID: id }, updatedData, {
      new: true,
    });

    const services = await ActiveEvents.find().sort({ createdAt: -1 });
    return res.status(201).json(services);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = updateActiveEvent;
