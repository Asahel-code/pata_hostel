const express = require('express');
const router = express.Router();
const regionController = require('../../controllers/regionController');
const getRegion = require('../../middleware/getRegion');
const verifyAuth = require('../../middleware/verifyAuth');
const verifyAdminRole = require('../../middleware/verifyAdminRole');

router.get('/', regionController.fetchAllRegions);
router.post('/', verifyAuth, verifyAdminRole, regionController.addRegion);
router.get('/:regionId', getRegion, regionController.fetchRegion);
router.patch('/:regionId', getRegion, verifyAuth, verifyAdminRole, regionController.updateRegion);
router.delete('/:regionId', getRegion, verifyAuth, verifyAdminRole, regionController.deleteRegion);

module.exports = router;