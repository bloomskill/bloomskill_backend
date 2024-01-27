const { Events } = require("../../models");

const deleteEvent = async (req, res, next) => {
  try {
    const { params } = req;
    const id = params.id;

    const event = await Events.deleteOne({ article_event: id });
    if (event.deletedCount === 0) {
      return res.status(400).json({ message: `Bad request (id incorrect)` });
    }
    const events = await Events.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: `Bad request (id incorrect)` });
  }
};

module.exports = deleteEvent;
