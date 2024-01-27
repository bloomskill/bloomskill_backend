const ctrlWrapper = require('./ctrlWrapper');
const uploadEventCloud = require('./uploadEventMiddleware');
const uploadCloud = require('./uploadMiddleware');
const authMiddleware = require('./authMiddleware');
const tokenValidation = require('./tokenValidation');
const { validateId } = require('./validationIdFavorites');
const { validation } = require('./validation');

module.exports = {
  ctrlWrapper,
  uploadEventCloud,
  uploadCloud,
  authMiddleware,
  tokenValidation,
  validation,
  validateId,
};
