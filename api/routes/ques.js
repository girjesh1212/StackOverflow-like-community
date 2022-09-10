const express = require('express');
const router = express.Router();
const passport = require('passport');
const { test, create, upvote, downvote } = require('../controllers/quesCtrl');


router.get('/test', test);
router.post('/create', passport.authenticate('user-passport', { session: false }), create);
router.get('/upvote/:quesId', passport.authenticate('user-passport', { session: false }), upvote);
router.get('/downvote/:quesId', passport.authenticate('user-passport', { session: false }), downvote);


module.exports = router;

// Done