const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes');
const errorHandler = require("./middlewares/errorsHandling")


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
    console.log('Requête reçue : ', req.method, req.url, req.params, req.body);
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api', apiRouter);

app.use(errorHandler)



module.exports = app;