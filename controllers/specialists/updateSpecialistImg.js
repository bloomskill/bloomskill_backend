const { ValidationError, dataFilterObj } = require("../../helpers");
const { Specialists } = require("../../models");
let path = require("path");

const updateSpecialistImg = async (req, res, next) => {
  const { id } = req.params;

  const updatedData = {
    image: "",
  };
  req.file?.path
    ? (updatedData.image = path.basename(req.file?.path))
    : (updatedData.image = path.basename(""));

  console.log("UPDATE updatedData", updatedData);

  try {
    const resUpdate = await Specialists.findOneAndUpdate(
      { specialistId: id },
      updatedData,
      {
        new: true,
      }
    );
    const specialists = await Specialists.find();
    return res.status(201).json(specialists);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = updateSpecialistImg;
