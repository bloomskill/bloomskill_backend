const express = require('express');
const { messages } = require('../../controllers');
const ctrlWrapper = require('../../middleWares/ctrlWrapper');

const { createMessage, getMessages, deleteMessage, updateMessage } = messages;
const router = express.Router();

router.post('/', ctrlWrapper(createMessage));
router.patch('/:id', ctrlWrapper(updateMessage));
router.get('/', ctrlWrapper(getMessages));
router.delete('/:id', ctrlWrapper(deleteMessage));

module.exports = routerMessages = router;
