const express = require('express');

const router = express.Router();

const authRoutes = require('./auth.route');
const conversationRoutes = require('./user.route');
const interetRoutes = require('./interet.route');
const matchRoutes = require('./match.route');
const questionRoutes = require('./question.route');
const userRoutes = require('./user.route');


router.use('/auth', authRoutes);
router.use('/conversation', conversationRoutes);
router.use('/interet', interetRoutes);
router.use('/match', matchRoutes);
router.use('/question', questionRoutes);
router.use('/user', userRoutes);



module.exports = router;