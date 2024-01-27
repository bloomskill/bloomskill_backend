const { Users } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let path = require('path');
const {
  dataFilter,
  dataFilterObj,
  userFullField,
  userFieldReceivedFromFront,
  requiredSignUpFields,
  checkObjByList,
  ValidationError,
  DuplicateEmailError,
} = require('../../helpers');

const { SECRET_KEY } = process.env;

const createUser = async (req, res, next) => {
  try {
    const isValidInData = checkObjByList(req.body, requiredSignUpFields);
    if (!isValidInData) {
      throw new ValidationError('Bad request, invalid data');
    }

    // const userDataCreate = dataFilter(req.body, userFieldReceivedFromFront);
    const userDataCreate = dataFilterObj(req.body);

    const hashPassword = bcrypt.hashSync(
      req.body.email,
      bcrypt.genSaltSync(10)
    );
    userDataCreate.password = hashPassword;
    // req.file?.path && (userDataCreate.avatar = req.file.path);

    req.file?.path
      ? (userDataCreate.avatar = path.basename(req.file?.path))
      : (userDataCreate.avatar = path.basename(''));

    if (!userDataCreate.events) {
      userDataCreate.events = [];
    }
    if (userDataCreate.packages) {
      let arr = [];
      userDataCreate.packages.forEach((value, i) => {
        arr.push(JSON.parse(value));
      });
      userDataCreate.packages = arr;
    }
    if (!userDataCreate.packages) {
      userDataCreate.packages = [];
    }

    const isFoundUser = await Users.findOne(
      { email: userDataCreate.email },
      'email'
    );
    if (isFoundUser) {
      throw new DuplicateEmailError(
        `Email: ${userDataCreate.email} already register`
      );
    }
    // userDataCreate.authToken = authToken;

    const user = await Users.create(userDataCreate);
    const payload = { id: user._id };
    const authToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '14d' });
    const result = await Users.findByIdAndUpdate(
      user._id,
      { authToken },
      { new: true }
    );

    // const newUser = dataFilter(result, userFullField);
    const newUser = dataFilterObj(result);
    return res
      .status(201)
      .json({ code: '201', message: 'user create', data: newUser._doc });
  } catch (err) {
    throw new ValidationError(err.message);
  }
};

module.exports = createUser;
