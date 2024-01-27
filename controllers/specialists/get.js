const { ValidationError } = require('../../helpers');
const { Specialists } = require('../../models');

const get = async (req, res, next) => {
  const { sort } = req.query;
  let specialists = [];

  try {
    if (sort) {
      if (sort === 'rating')
        specialists = await Specialists.find().sort({
          rating: 1,
        });
    } else {
      specialists = await Specialists.find();
    }

    res.status(200).json(specialists);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = get;
