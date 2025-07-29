const express = require('express');
const passport = require('passport');
const { googleCallback, failure, requestRegistrationOtp, loginUser, verifyOtpAndRegister, requestPasswordResetOtp, verifyOtpAndResetPassword } = require('../controllers/auth.controllers');
const router = express.Router();



router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google'), googleCallback);


router.get('/failure', failure);

router.post('/register', requestRegistrationOtp);
router.post('/verify', verifyOtpAndRegister);
router.post('/login', loginUser);

router.post('/request-password-reset', requestPasswordResetOtp);
router.post('/reset-password', verifyOtpAndResetPassword);

module.exports = router;