const { ActiveEvents } = require('../../models');

const deleteActiveEvent = async (req, res, next) => {
  try {
    const { params } = req;
    const id = params.id;

    const events = await ActiveEvents.deleteOne({article_eventID: id });
    if (events.deletedCount === 0) {
      return res.status(400).json({ message: `Bad request (id incorrect)` });
    }
    const services = await ActiveEvents.find().sort({ createdAt: -1 });
    return res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ message: `Bad request (id incorrect)` });
  }
};

module.exports = deleteActiveEvent;
