const { ValidationError } = require("../../helpers");
const { ActiveEvents } = require("../../models");

const geActiveEvents = async (req, res, next) => {
  const date = new Date();

  try {
    const services = await ActiveEvents.find().sort({ createdAt: -1 });
    services.map(async (it) => {
      if (it.date < date) {
        it.status = "blocked";
        await ActiveEvents.findOneAndUpdate(
          { article_eventID: it.article_eventID },
          it,
          { new: true }
        );
      }
    });
    const newServices = await ActiveEvents.find().sort({ createdAt: -1 });
    res.status(200).json(newServices);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};
module.exports = geActiveEvents;
