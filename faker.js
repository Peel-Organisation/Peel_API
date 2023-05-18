const { faker } = require('@faker-js/faker');
faker.setLocale('fr')
const User = require("./models/user.js");
const axios = require('axios');

// import { faker } from '@faker-js/faker/locale/de';


const createRandomUser = () => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthday: faker.date.birthdate(),
    gender: ["Male", "Female", "Other"][getRandomInt(3)],
    position: {longitude: faker.address.longitude(), latitude: faker.address.latitude()}, // change to position
    favourite_music: faker.music.songName(),
    // favourite_movie: faker.movie.title(),
    questions: [{ question : "63cdcc53dae4c0f0b9abe873",
      answer: faker.lorem.sentence()
    },
    { question : "63cdcc53dae4c0f0b9abe873",
      answer: faker.lorem.sentence()
    },
    { question : "63cdcc53dae4c0f0b9abe873",
      answer: faker.lorem.sentence()
    }],
    interests: ["63cdc8d488c95911d860cfbc","63cdc8df88c95911d860cfbe", "63cdc8f788c95911d860cfc6", "63cdc8ea88c95911d860cfc2", "63cdc8ef88c95911d860cfc4"],
    // gif_link: String,
    preferences: {age: {min: faker.random.numeric(2), max: faker.random.numeric(2)}, searchRange: faker.random.numeric(3), sexual_orientation: ["hetero", "homo", "bi"][getRandomInt(3)] },
    biographie: faker.lorem.sentence(),
    isFake: true
  };
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



for (i = 0; i < 5; i++){
    const user = new User(createRandomUser());
    console.log(user);
    link = 'http://localhost:3001/api/user';
    axios.post(link, user)
 
} 