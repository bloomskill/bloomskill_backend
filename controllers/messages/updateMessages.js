const { ValidationError } = require("../../helpers");
const { Messages } = require("../../models");
// let path = require('path');

const updateMessage = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, message, status } = req.body;

  const updatedData = {
    name,
    email,
    message,
    status,
  };

  console.log("UPDATE MESSAGE", updatedData);

  try {
    const resUpdate = await Messages.findByIdAndUpdate(
      { _id: id },
      updatedData,
      {
        new: true,
      }
    );
    const messages = await Messages.find();
    res.status(201).json(messages);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = updateMessage;
