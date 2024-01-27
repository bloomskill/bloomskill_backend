const { ValidationError, dataFilterObj } = require('../../helpers');
const { Orders } = require('../../models');
// let path = require('path');

const updateOrder = async (req, res, next) => {
  const { id } = req.params;
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

  const updatedData = {
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

  console.log('UPDATE ORDER', updatedData);

  try {
    const resUpdate = await Orders.findByIdAndUpdate(
      { _id: id },
      updatedData,
      {
        new: true,
      }
    );
    const orders = await Orders.find();
    res.status(201).json(orders);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = updateOrder;
