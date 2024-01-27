const express = require('express');
const { active_events } = require('../../controllers');
const ctrlWrapper = require('../../middleWares/ctrlWrapper');

const router = express.Router();
const { getByIdActiveEvent, geActiveEvents, createActiveEvent, updateActiveEvent, deleteActiveEvent } = active_events;

router.get('/', ctrlWrapper(geActiveEvents));
router.post("/", ctrlWrapper(createActiveEvent));
router.post("/:id", ctrlWrapper(updateActiveEvent));
router.get('/:id/', ctrlWrapper(getByIdActiveEvent));
router.delete("/:id",  ctrlWrapper(deleteActiveEvent));

module.exports = routerActiveEvents = router;
