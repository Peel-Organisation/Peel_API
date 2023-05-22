const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");

require('dotenv').config();


let userToken = ""


let user = {}



mongoose.set('strictQuery', false);

beforeAll(async() => {
    await mongoose.connect(
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}${process.env.MONGO_URL}/?retryWrites=true&w=majority`,
    )
});


describe("POST /api/auth/register", () => {
    test("should return user token", done => {
        request(app).post("/api/auth/register")
        .send({
            email: "tester@tester",
            password: "testtest"
        }).then(res => {
            expect(res.statusCode).toBe(200);
            expect(res.body.auth).toBe(true);
            userToken = res.body.token;
            done();
        });
    });

    test("should return user", done => {
        request(app)
        .get("/api/user")
        .set({"authorization" : userToken})
        .then(res => {
            expect(res.statusCode).toBe(200);
            user = res.body;
            done();
        });
    }
    );
});

describe("GET /api/match/getSwipeProfilUser", () => {
    test("should return user list", done => {
        request(app)
        .get("/api/match/getSwipeProfilUser")
        .set({"authorization" : userToken})
        .then(res => {
            expect(res.statusCode).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            done();
        });
    }
    );
});

describe("DELETE /api/user/useradmin", () => {

    let adminToken = ""
    test("should return userAdmin", done => {
        request(app).post("/api/auth/login")
        .send({
            email: "damien@test.com",
            password: "testtest"
        }).then(res => {
            console.log(res.body);
            expect(res.statusCode).toBe(200);
            expect(res.body.auth).toBe(true);
            adminToken = res.body.token;
            done();
        });
    });

    test("should delete user", done => {
        request(app)
        .delete("/api/user/useradmin/" + user._id)
        .set({"authorization" : adminToken})
        .then(res => {
            expect(res.statusCode).toBe(200);
            done();
        }
        );
    });
    test("should return 404", done => {
        request(app)
        .get("/api/user/useradmin/" + user._id)
        .set({"authorization" : adminToken})
        .then(res => {
            expect(res.statusCode).toBe(404);
            done();
        }
        );
    });
});