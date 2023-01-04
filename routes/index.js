const express = require('express');

const router = express.Router();

const authRoutes = require('./auth');
const conversationRoutes = require('./user');
const interetRoutes = require('./interet');
const matchRoutes = require('./match');
const questionRoutes = require('./question');
const userRoutes = require('./user');


router.use('/api/auth', authRoutes);
router.use('/api/conversation', conversationRoutes);
router.use('/api/interet', interetRoutes);
router.use('/api/match', matchRoutes);
router.use('/api/question', questionRoutes);
router.use('/api/user', userRoutes);



module.exports = router;