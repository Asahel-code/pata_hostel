const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const verifyAuth = require('../../middleware/verifyAuth');

router.post('/', authController.handleLogin);
router.post('/passwordResetRequest', authController.handlePasswordResetRequest);
router.post('/resetPassword', authController.resetPassword);
router.post('/verifyAccount', verifyAuth, authController.verifyAccount);
router.get('/resendVerificationToken', verifyAuth, authController.resendVerificationToken);

module.exports = router;