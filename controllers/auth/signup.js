const { Users } = require("../../models");
const {
  dataFilter,
  requiredSignUpFields,
  checkObjByList,
  ValidationError,
  DuplicateEmailError,
} = require("../../helpers");

const signup = async (req, res, next) => {
  console.log("req.body", req.body);
  const isValidInData = checkObjByList(req.body, requiredSignUpFields);
  if (!isValidInData) {
    throw new ValidationError("Bad request, invalid data");
  }
  const userDataCreate = dataFilter(req.body, requiredSignUpFields);
  console.log("userDataCreate", userDataCreate);
  userDataCreate.packages = [];
  userDataCreate.packages.push(req.body.packages);
  console.log(userDataCreate);

  const isFoundUser = await Users.findOne(
    { email: userDataCreate.email },
    "email"
  );
  if (isFoundUser) {
    throw new DuplicateEmailError(
      `Email: ${userDataCreate.email} already register`
    );
  }

  const user = await Users.create(userDataCreate);
  res.status(201).json({ message: "Create success" });
};

module.exports = signup;
