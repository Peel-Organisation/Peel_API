const express = require('express');

const router = express.Router();

const authRoutes = require('./auth.route');
const conversationRoutes = require('./conversation.route');
const interestRoutes = require('./interest.route');
const matchRoutes = require('./match.route');
const questionRoutes = require('./question.route');
const userRoutes = require('./user.route');


router.use('/auth', authRoutes);
router.use('/conversation', conversationRoutes);
router.use('/interest', interestRoutes);
router.use('/match', matchRoutes);
router.use('/question', questionRoutes);
router.use('/user', userRoutes);
router.get('/', (req, res) => {
    res.send('Welcome to the API');
});


module.exports = router;