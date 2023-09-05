const express = require('express');
const router = express.Router();
const stkPushController = require('../../controllers/payment-services/mpesaController');
const accessToken = require('../../middleware/generateAccessToken');
const verifyAuth = require('../../middleware/verifyAuth');

router.get("/mpesa/stkpush/:phoneNumber&:amount&:businessCode&:account", verifyAuth, accessToken, stkPushController.performPayment);
router.get("/mpesa/stkpush/query/:checkoutRequestID&:businessCode", verifyAuth, accessToken, stkPushController.querySTKPayment);
router.post("/mpesa/stkpush/result/", stkPushController.getTransctionsResults);


module.exports = router;