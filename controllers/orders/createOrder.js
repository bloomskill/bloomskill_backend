const { ValidationError } = require("../../helpers");
const { Orders } = require("../../models");
const { ActiveEvents } = require("../../models");

const createOrder = async (req, res, next) => {
  const {
    eventId,
    activeEventID,
    date,
    time,
    userName,
    userEmail,
    bookingSeats,
    priceTotal,
    status,
  } = req.body;

  const newData = {
    eventId,
    activeEventID,
    date,
    time,
    userName,
    userEmail,
    bookingSeats,
    priceTotal,
    status: status ? status :"new",
  };


  const updatedD = await ActiveEvents.find({article_eventID:activeEventID});
  const updatedData = updatedD[0];
  if(updatedData.booking) {updatedData.booking = updatedData.booking + newData.bookingSeats};
  if (updatedData.vacancies){updatedData.vacancies = updatedData.vacancies - newData.bookingSeats};
  if (updatedData.vacancies < 0 ){updatedData.vacancies = 0};

  console.log("CREATE OREDER:", newData);
  try {
    const resCreate = await Orders.create(newData);
    if(resCreate){ await ActiveEvents.findOneAndUpdate({ article_eventID: activeEventID }, updatedData, {
      new: true,
    })};
    return res.status(201).json(resCreate);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = createOrder;
