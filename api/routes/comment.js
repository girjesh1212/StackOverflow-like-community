const express = require('express');
const router = express.Router();
const passport = require('passport');
const { test, create } = require('../controllers/commentCtrl');


router.get('/test', test);
router.post('/create', passport.authenticate('user-passport', { session: false }), create);

module.exports = router;
