const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");

require('dotenv').config();


let token = ""

mongoose.set('strictQuery', false);

beforeAll(async() => {
    await mongoose.connect(
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}${process.env.MONGO_URL}/?retryWrites=true&w=majority`,
    )
});


describe("POST /api/auth/login", () => {
    test("should return admin token", done => {
        request(app).post("/api/auth/login")
        .send({
            email: "damien@test.com",
            password: "testtest"
        }).then(res => {
            console.log(res.body);
            expect(res.statusCode).toBe(200);
            expect(res.body.auth).toBe(true);
            token = res.body.token;
            done();
        });
    });
});

describe("GET /api/auth/protected", () => {
    test("should return user", done => {
        request(app)
        .get("/api/auth/protected")
        .set({"authorization" : token})
        .then(res => {
            expect(res.statusCode).toBe(200);
            expect(res.body.auth).toBe(true);
            done();
        });
    }
    );
});

describe("GET /api/user/useradmin", () => {
    it("should return all users", done => {
        request(app)
        .get("/api/user/useradmin")
        .set({"authorization" : token})
        .then(res => {
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
            done();
        });
    });
});