const express = require("express");
const { categories } = require("../../controllers");
const ctrlWrapper = require("../../middleWares/ctrlWrapper");

const { createCategory, get, deleteCategory, updateCategory } = categories;
const router = express.Router();

router.post("/", ctrlWrapper(createCategory));
router.patch("/:id", ctrlWrapper(updateCategory));
router.delete("/:id", ctrlWrapper(deleteCategory));
router.get("/", ctrlWrapper(get));

module.exports = routerCategories = router;
