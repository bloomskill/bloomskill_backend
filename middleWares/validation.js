const { ValidationError } = require("../helpers");

const validation = (schema) => {
  return (req, res, next) => {
    console.log("validation req.query: ", req.query);
    console.log("validation req.body: ", req.body);
    console.log("validation req.params: ", req.params);
    const dataValidate =
      Object.keys(req.query).length > 0
        ? req.query
        : JSON.parse(JSON.stringify(req.body));
    console.log("dataValidate: ", dataValidate);
    const { error } = schema.validate(dataValidate);
    console.log("validation ~ error:", error);
    if (error) {
      throw new ValidationError(error.message);
    }
    next();
    // return true;
  };
};

module.exports = { validation };
