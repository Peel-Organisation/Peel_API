const { faker } = require('@faker-js/faker');
faker.setLocale('fr')
// import { faker } from '@faker-js/faker/locale/de';


const createRandomUser = () => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
    position: {longitude: faker.address.longitude, latitude: faker.address.latitude}, // change to position
    favourite_music: faker.music.songName(),
    // favourite_movie: faker.movie.title(),
    // questions: {question: faker.lorem.sentence(), answer: faker.lorem.sentence()},
    // interests: Array,
    // gif_link: String,
    preferences: {age: {min: faker.random.numeric(2), max: faker.random.numeric(2)}, search_zone: faker.random.numeric(3), gender: faker.random.numeric() },
    bio: faker.lorem.sentence(),
    isFake: true
  };
}

for (i = 0; i < 10; i++){
    const user = createRandomUser();
    console.log(user);
}

