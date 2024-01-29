const { Messages } = require("../../models");

const deleteMessage = async (req, res, next) => {
  try {
    const { params } = req;
    const id = params.id;
    const message = await Messages.deleteOne({ _id: id });
    if (message.deletedCount === 0) {
      return res.status(400).json({ message: `Bad request (id incorrect)` });
    }
    const messages = await Messages.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: `Bad request (id incorrect)` });
  }
};

module.exports = deleteMessage;
