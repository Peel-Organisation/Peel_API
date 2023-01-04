const express = require('express');

const router = express.Router();

const profileRoutes = require('./profile');
const userRoutes = require('./user');
const interetRoutes = require('./interet');
const questionRoutes = require('./question');
const matchRoutes = require('./match');
const contactRoutes = require('./contact');
const chatRoutes = require('./chat');

router.use('/api/profile', profileRoutes);
router.use('/api/auth', userRoutes);
router.use('/api/interet', interetRoutes);
router.use('/api/question', questionRoutes);
router.use('/api/match', matchRoutes);
router.use('/api/contact', contactRoutes);
router.use('/api/chat', chatRoutes);


module.exports = router;