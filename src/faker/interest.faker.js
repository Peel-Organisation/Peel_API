const { faker } = require('@faker-js/faker');
faker.setLocale('fr')
const interest = require("./models/interest.js");
const axios = require('axios');

// import { faker } from '@faker-js/faker/locale/de';



const createRandominterest = () => {
  return {
    name: faker.internet.email(),
  };
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const interest_list = []

for (i = 0; i < 5; i++){
    const interest = new interest(createRandominterest());
    console.log(interest);
    // link = 'http://localhost:3001/api/interest';
    // axios.post(link, interest)
 
} 