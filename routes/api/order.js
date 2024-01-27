const express = require("express");
const { orders } = require("../../controllers");
const ctrlWrapper = require("../../middleWares/ctrlWrapper");

const { createOrder, get, updateOrder, deleteOrder } = orders;
const router = express.Router();

router.post("/", ctrlWrapper(createOrder));
router.post("/:id", ctrlWrapper(updateOrder));
router.get("/", ctrlWrapper(get));
router.delete("/:id",  ctrlWrapper(deleteOrder));

module.exports = routerOrders = router;
