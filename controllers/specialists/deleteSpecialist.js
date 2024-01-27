const { Specialists } = require("../../models");

const deleteSpecialist = async (req, res, next) => {
  try {
    const { params } = req;
    const id = params.id;

    const category = await Specialists.deleteOne({ specialistId: id });
    if (category.deletedCount === 0) {
      return res.status(400).json({ message: `Bad request (id incorrect)` });
    }
    const specialists = await Specialists.find();
    res.status(200).json(specialists);
  } catch (error) {
    res.status(400).json({ message: `Bad request (id incorrect)` });
  }
};

module.exports = deleteSpecialist;
