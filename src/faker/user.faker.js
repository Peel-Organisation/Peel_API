const { faker } = require('@faker-js/faker');
require('dotenv').config();
const User = require("../models/user.js");
const axios = require('axios');
const { getRandomGif, getRandomMovie, updateInterest, getCustumBio, getRandomMusic, getRandomModules } = require('./utils.js');

// import { faker } from '@faker-js/faker/locale/de';

const addUser = async (user) => {
    try {
        const AdminToken = await loginAdmin();
        const requestOptions = {
            headers: { 'Content-Type': 'application/json', "authorization": AdminToken },
            method: 'POST',
            body: JSON.stringify(user)
        };
        let link = `${process.env.API_LINK}/user/useradmin/`;
        const response = await fetch(link, requestOptions)
        const dataJson = await response.json();
        let status_code = response.status;
        if (status_code !== 200) {
            throw new Error(dataJson.message);
        }
        return dataJson;
    }
    catch (error) {
        console.log("error : ", error);
    }   
}


const loginAdmin = async () => {
    try {
        const requestOptions = {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD })
        };
        let link = `${process.env.API_LINK}/auth/login`;
        const response = await fetch(link, requestOptions)
        const dataJson = await response.json();
        let status_code = response.status;
        if (status_code !== 200) {
            throw new Error(dataJson.message);
        }
        return dataJson.token;
    }
    catch (error) {
        console.log("error : ", error);
    }
}

const getRandomInterval = (min, max) => {
  let minInterval = Math.random() * (max - min) + min;
  let maxInterval = Math.floor(Math.random() * (max - minInterval) + minInterval);
  return [minInterval, maxInterval]
}


const createRandomUser = async () => {
  let person = faker.person;
  let interval = getRandomInterval(18, 100);
  let minAgeInteval = interval[0];
  let maxAgeInteval = interval[1];
  let user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: person.firstName(),
    lastName: person.lastName(),
    birthday: faker.date.birthdate(),
    interests: [],
    music: {},
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
    biographie: person.bio(),
    isFake: true
  };
  console.log(user.preferences)
  getRandomGif(user).then((user) => {
    getRandomMovie(user).then((user) => {
      console.log("user0 : ", user)
      updateInterest(user).then((user) => {
        console.log("user1 : ", user)
        getRandomModules(user).then((user) => {
          console.log("user2 : ", user)
          getRandomMusic(user).then((user) => {
            console.log("user3 : ", user)

            addUser(user).then((user) => {
                console.log("user updated : ", user)
            })
          })
        })
      })
    })
  })

  // user = await getCustumBio(user)

  return user
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}






for (let i = 0; i < 50; i++){
  createRandomUser()
} 