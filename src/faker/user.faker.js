const { faker } = require('@faker-js/faker');
faker.setLocale('fr')
const User = require("../models/user.js");
const axios = require('axios');
const { getRandomGif, getRandomMovie, updateInterest, getCustumBio } = require('./utils.js');

// import { faker } from '@faker-js/faker/locale/de';



const createRandomUser = async () => {
  let person = faker.person();
  let (minAgeInteval, maxAgeInteval) = getRandomInterval(18, 100);
  let user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: person.firstName(),
    lastName: person.lastName(),
    birthday: faker.date.birthdate(),
    gender: ["Male", "Female", "Other"][getRandomInt(3)],
    questions: [{ question : "63cdcc53dae4c0f0b9abe873",
      answer: faker.lorem.sentence()
    },
    { question : "63cdcc53dae4c0f0b9abe873",
      answer: faker.lorem.sentence()
    },
    { question : "63cdcc53dae4c0f0b9abe873",
      answer: faker.lorem.sentence()
    }],
    // gif_link: String,
    preferences: {age: {min: minAgeInteval, max: maxAgeInteval}, sexual_orientation: ["hetero", "homo", "bi"][getRandomInt(3)] },
    biographie: person.bio,
    isFake: true
  };
  user = await getRandomGif(user)
  user = await getRandomMovie(user)
  user = await updateInterest(user)
  user = await getCustumBio(user)
  return user
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const getRandomInterval = (min, max) => {
  let minInterval = Math.random() * (max - min) + min;
  let maxInterval = Math.floor(Math.random() * (max - minInterval) + minInterval);
  return (minInterval, maxInterval)
}




for (i = 0; i < 5; i++){
    const user = new User(createRandomUser());
    console.log(user);
    link = 'http://localhost:3001/api/user';
    axios.post(link, user)
 
} 