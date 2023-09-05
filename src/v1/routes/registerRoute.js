const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/registerController');

router.post('/', registerController.handleNewUser);
router.post('/landlord', registerController.handleNewLandLord);

module.exports = router;