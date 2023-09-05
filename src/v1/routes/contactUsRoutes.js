const express = require("express");
const router = express.Router();
const contactUsController = require("../../controllers/contactUsController");

router.post("/", contactUsController.handleContact);

module.exports = router;