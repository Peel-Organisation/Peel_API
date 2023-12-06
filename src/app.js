const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes');


const bodyParser = require('body-parser')
const app = express()
app.use(cors());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json());

app.use((req, res, next) => {
  if (process.env.STACK === 'development') {
    const currentTime = new Date().toISOString();
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`[${currentTime}] - Requête reçue : ${req.method}, ${req.url}, ${req.params}, ${req.body} , | de IP:  [${clientIp}] `);

    if (req.method === 'POST' || req.method === 'PUT') {
      console.log('Corps de la requête :', req.body);
    }

  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api', apiRouter);


module.exports = app;