const express = require('express');
var cors = require('cors');

var bodyParser = require('body-parser')
var app = express()
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json());

 


const profileRoutes = require('./routes/profile');
const authRoutes = require('./routes/auth');
const interetRoutes = require('./routes/interet');
const questionRoutes = require('./routes/question');
const matchRoutes = require('./routes/match');
const contactRoutes = require('./routes/contact');
const chatRoutes = require('./routes/chat');
const userRoutes = require('./routes/user');



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// app.use(bodyParser.json());

app.use('/api/profile', profileRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/interet', interetRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/user', userRoutes);




 

module.exports = app;