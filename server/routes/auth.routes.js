const express = require('express');
const passport = require('passport');
const { googleCallback, failure } = require('../controllers/auth.controllers');
const router = express.Router();



router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google'), googleCallback);


router.get('/failure', failure);

module.exports = router;
