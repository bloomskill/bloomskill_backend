const { ValidationError } = require('../../helpers');
const { Specialists } = require('../../models');

const getSpecialistById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const specialistById = await Specialists.findOne({ specialistId: id });
    res.status(200).json(specialistById);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = getSpecialistById;
