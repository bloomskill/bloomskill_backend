const { ValidationError } = require("../../helpers");
const { Events } = require("../../models");
let path = require("path");

const updateEventImg = async (req, res, next) => {
  const {id} = req.params;
  const perem = req.body?.name;
  const updatedData = {
    [perem]: "",
  };
  req.file?.path
    ? (updatedData[perem] = path.basename(req.file?.path))
    : (updatedData[perem] = path.basename(""));

  console.log("id", id);
  console.log("UPDATE updatedData", updatedData);
  const resUpdate = await Events.findOneAndUpdate(
    { article_event: id },
    updatedData,
    {
      new: true,
    }
  );

  const services = await Events.find().sort({ createdAt: -1 });
  res.status(200).json(services);
};


module.exports = updateEventImg;
