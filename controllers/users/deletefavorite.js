const { Users } = require("../../models");
const { dataFilter, userMainField } = require("../../helpers");

const deleteFavorite = async (req, res, next) => {
  const { user, params } = req;

  const ddd = await Users.updateOne(
    { _id: user._id },
    { $pull: { favorites: params.id } }
  );

  const resUpdate = await Users.findOne({ _id: user._id });
  const newResponse = dataFilter(resUpdate, userMainField);
  res.status(201).json(newResponse);
};

module.exports = deleteFavorite;
