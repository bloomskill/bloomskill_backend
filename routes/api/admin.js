const express = require('express');
const { events, users } = require('../../controllers');
const {
  userValidationSchema,
  userEditValidationSchema,
  eventsValidationSchema,
} = require('../../models');

const {
  ctrlWrapper,
  authMiddleware,
  validation,
  upload,
  uploadEvent,
  uploadCloud,
} = require('../../middleWares');

const router = express.Router();

// ---- EVENTS --- //
router.get(
  '/events',
  ctrlWrapper(authMiddleware),
  ctrlWrapper(events.getEvents)
);

router.post(
  '/events/create',
  ctrlWrapper(authMiddleware),
  // uploadEvent.single("image"),
  uploadCloud.fields([
    { name: 'image', maxCount: 1 },
    { name: 'image_1', maxCount: 1 },
    { name: 'image_2', maxCount: 1 },
  ]),
  validation(eventsValidationSchema),
  ctrlWrapper(events.createEvent)
);

router.get(
  '/events/:id',
  ctrlWrapper(authMiddleware),
  ctrlWrapper(events.getById)
);

router.delete(
  '/events/:id',
  ctrlWrapper(authMiddleware),
  ctrlWrapper(events.deleteEvent)
);

router.patch(
  '/events/:id',
  ctrlWrapper(authMiddleware),
  // uploadEvent.single("image"),
  uploadCloud.fields([
    { name: 'image', maxCount: 1 },
    { name: 'image_1', maxCount: 1 },
    { name: 'image_2', maxCount: 1 },
  ]),
  validation(eventsValidationSchema),
  ctrlWrapper(events.updateEvent)
);

// ---- USERS --- //

router.get('/users', ctrlWrapper(authMiddleware), ctrlWrapper(users.getUsers));

router.post(
  '/users/create',
  ctrlWrapper(authMiddleware),
  // upload.single('avatar'),
  uploadCloud.single('avatar'),
  validation(userValidationSchema),
  ctrlWrapper(users.createUser)
);

router.get(
  '/users/:id',
  ctrlWrapper(authMiddleware),
  ctrlWrapper(users.getUserById)
);

router.delete(
  '/users/:id',
  ctrlWrapper(authMiddleware),
  ctrlWrapper(users.deleteUsers)
);

router.patch(
  '/users/:id',
  ctrlWrapper(authMiddleware),
  // upload.single('avatar'),
  uploadCloud.single('avatar'),
  validation(userEditValidationSchema),
  ctrlWrapper(users.updateUser)
);

// ---- PACKAGES --- //

// router.get("/packages", ctrlWrapper(authMiddleware), ctrlWrapper(packages.get));

// router.post(
//   "/packages/create",
//   ctrlWrapper(authMiddleware),
//   validation(packagesValidationSchema),
//   ctrlWrapper(packages.createPackages)
// );

// router.get(
//   "/packages/:id",
//   ctrlWrapper(authMiddleware),
//   ctrlWrapper(packages.getPackageById)
// );

// router.delete(
//   "/packages/:id",
//   ctrlWrapper(authMiddleware),
//   ctrlWrapper(packages.deletePackage)
// );

// router.patch(
//   "/packages/:id",
//   ctrlWrapper(authMiddleware),
//   validation(packagesValidationSchema),
//   ctrlWrapper(packages.updatePackage)
// );

module.exports = routerAdmin = router;
