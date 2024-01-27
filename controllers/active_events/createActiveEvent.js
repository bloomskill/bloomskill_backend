const { ValidationError, dataFilterObj } = require("../../helpers");
const { ActiveEvents } = require("../../models");
let path = require("path");

const createActiveEvent = async (req, res, next) => {
  // const newData = dataFilterObj(req.body);
  const {
    id,
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
    status
  } = req.body;

  const newData = {
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

  console.log("CREATE ACTIVE EVENT:", newData);

  try {
    const resCreate = await ActiveEvents.create(newData);
    const services = await ActiveEvents.find().sort({ createdAt: -1 });
    return res.status(201).json(services);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = createActiveEvent;
