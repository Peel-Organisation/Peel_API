const { fakerFR } = require('@faker-js/faker');


const createRandomUQuestion = () => {
    return {
        id: fakerFR.number.int({ min: 1, max: 100 }),
        question: fakerFR.lorem.sentence(),
    }
}

const RandomQuestion = createRandomUQuestion()

const RandomQuestionsTab = fakerFR.helpers.multiple(createRandomUQuestion, {
    count: 5,
});

module.exports = { RandomQuestion, RandomQuestionsTab };