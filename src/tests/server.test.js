const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
require('dotenv').config();
mongoose.set('strictQuery', false);


beforeEach(() => {
    mongoose.connect(
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@peeldb.xaoe2as.mongodb.net/?retryWrites=true&w=majority`,
    )
});

afterEach((done) => {
    mongoose.disconnect(done);
});

describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/api/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});



