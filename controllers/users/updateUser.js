const { ValidationError } = require('../../helpers');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
let path = require('path');

const { Users } = require('../../models');
const {
  userMainField,
  userFieldReceivedFromFront,
  dataFilter,
  dataFilterObj,
} = require('../../helpers');

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    // const newData = dataFilter(req.body, userFieldReceivedFromFront);
    const newData = dataFilterObj(req.body);
    // req.file?.path && (newData.avatar = req.file.path);
    if (req.file?.path) {
      newData.avatar = path.basename(req.file?.path);
    }

    if (!newData.events) {
      newData.events = [];
    }

    if (newData.packages) {
      let arr = [];
      newData.packages.forEach((value, i) => {
        arr.push(JSON.parse(value));
      });
      newData.packages = arr;
    }
    if (!newData.packages) {
      newData.packages = [
        {
          name: '',
          termActive: { from: '', to: '' },
        },
      ];
    }

    const resUpdate = await Users.findByIdAndUpdate({ _id: id }, newData, {
      new: true,
    });
    // const newResponse = dataFilter(resUpdate, userMainField);
    const newResponse = dataFilterObj(resUpdate);
    req.file?.path && (newResponse.avatar = req.file.path);

    console.log('updateUser:', newResponse._doc);
    return res.status(201).json(newResponse._doc);
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = updateUser;
