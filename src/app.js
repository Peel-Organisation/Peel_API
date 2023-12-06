const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes');
const moment = require('moment');
const helmet = require('helmet');


const bodyParser = require('body-parser')
const app = express()
app.use(cors());
app.use(helmet());

// Trust the headers set by your reverse proxy
app.set('trust proxy', true);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json());

app.use((req, res, next) => {
  if (process.env.STACK === 'development') {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const clientIp = (req.headers['x-forwarded-for'] || '').split(',').shift().replace('::ffff:', '') || req.ip;
    console.log(`[${currentTime}] - Requête reçue : ${req.method}, ${req.url}, ${JSON.stringify(req.params)}, ${JSON.stringify(req.body)} | l'adresse IP source : [${clientIp}] `);
    if (req.method === 'POST' || req.method === 'PUT') {
      console.log(`[${currentTime}] - Corps de la requête :  ${JSON.stringify(req.body)} | de l'adresse IP:  [${clientIp}] `);
    }
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api', apiRouter);

// Reduce Fingerprinting
app.disable('x-powered-by')


module.exports = app;