const express = require("express");
const router = express.Router();
const landLordController = require("../../controllers/landLordController");
const getLandLord = require("../../middleware/getLandLord");
const verifyAuth = require('../../middleware/verifyAuth');
const verifyLandLordRole = require('../../middleware/verifyLandLordRole');
const verifyAdminRole = require('../../middleware/verifyAdminRole');
const getAdminLandLord = require("../../middleware/getAdminLandLord");

router.get('/', verifyAuth, verifyAdminRole, landLordController.fetchAllLandLord);
router.get('/check', verifyAuth, verifyLandLordRole, landLordController.checkLandlord);
router.get('/profile', verifyAuth, verifyLandLordRole, getLandLord, landLordController.fetchLandLordDetails);
router.post('/', verifyAuth, verifyLandLordRole, landLordController.addLandLordDetails);
router.patch('/', verifyAuth, verifyLandLordRole, getLandLord, landLordController.updateLandLordDetails);
router.patch('/pay_subcription', verifyAuth, verifyLandLordRole, getLandLord, landLordController.payforSubscription);
router.get('/admin/:landlordId', verifyAuth, verifyAdminRole, getAdminLandLord, landLordController.fetchLandLordDetails);
router.patch('/admin/:landlordId', verifyAuth, verifyAdminRole, getAdminLandLord, landLordController.updateLandLordDetails);
router.delete('/admin/:landlordId', verifyAuth, verifyAdminRole, getAdminLandLord, landLordController.deleteLandLordDetails);

module.exports = router;