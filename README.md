# Peel API
## Description
Peel API is a RESTfull API that allows users of our mobile application (PEEL) to meet people without going through their physical appearance.

## Table of Contents
- [Installation](#Installation)
- [Configuration](#Configuration)
- [Authentication](#Authentication)
- [CI/CD](#CI/CD)
- [Docker](#Docker)
- [Usage](#Usage)
- [Examples](#Examples)
- [License](#License)
- [Author](#Author)

## Installation
Clone this repository on your local machine.

```shell
git clone https://github.com/Peel-Organisation/Peel_API.git
```

Install the dependencies by running the following command:

```shell
npm install
```

Configure the required environment variables by creating a .env file at the root of the project and specifying the required values.

## Configuration

If you want to run the API locally, you must configure the following environment variables:

- MONGO_DB_USER: Username for the MongoDB database.
- MONGO_DB_PASSWORD: Password for the MongoDB database.
- PORT: Port on which the API will run.
- JWT_SECRET: Secret key used to sign the JWT tokens.
- STACK: Stack used to run the API (development, production).
- FIREBASE_SERVICE_ACCOUNT_KEY: Firebase service account key used to send notifications.


## Authentication

This API uses the json web token. To make protected requests, include the Authorization header with the value of the access token. This token is returned when you log and register in to the API.

## CI/CD
This project uses GitHub Actions to build and push a Docker image to Docker Hub. The image is then used to deploy the API on a EC2 instance on AWS.

[![Build and Push Docker Image](https://github.com/Peel-Organisation/Peel_API/actions/workflows/docker-image.yml/badge.svg?branch=main)](https://github.com/Peel-Organisation/Peel_API/actions/workflows/docker-image.yml)


## Docker

You can also run the API using Docker. To do so, follow these steps:

1. Build the Docker image by running the following command:

```shell
docker build -t peel-api .
```

2. Run the Docker container by running the following command:

```shell 
docker run -p 3000:3000 peel-api
```

OR

3. Run the Docker container using docker-compose by running the following command:

```shell
docker-compose up
```

OR 

4. You can also use the API on the EC2 instance at the link below:

```shell
http://ec2-13-38-128-96.eu-west-3.compute.amazonaws.com/
```

## Usage

To use this API, follow these steps:

1. Start the API by running the following command:

```shell
npm start
```

2. Access the API URL using your favorite HTTP client (e.g. cURL, Postman, etc.).

3. Use the available routes to interact with the API. Here are some examples of routes:

- GET /api/user/one/:id: Retrieves the profile of a user specified by their ID.
- POST /api/auth/login: Login a user's profile.

Please refer to the [Routes File]("./src/routes") for more information about the available routes.

Make sure to include the required authentication headers for protected routes.

## Examples
Here are some examples of requests and responses for the main routes of the API:

### Retrieve a user's profile

URL: /api/user/one/:id

Method: GET

URL parameters: id - The ID of the user

Example response:

```json
{
    "position": {
        "longitude": -110.0849872,
        "latitude": 25.07
    },
    "gif": {
        "image": {
            "height": 240,
            "width": 480,
            "url": "https://media2.giphy.com/media/l3fQBu9N5O7oMibni/giphy.gif?cid=6ad99b0edea9846369861813cc9ffe2dc1e81d84a81e6834&rid=giphy.gif&ct=g",
            "webp": "https://media2.giphy.com/media/l3fQBu9N5O7oMibni/giphy.webp?cid=6ad99b0edea9846369861813cc9ffe2dc1e81d84a81e6834&rid=giphy.webp&ct=g",
            "frames": 17,
            "hash": "d499a4941ef3fd80b38e1b736938912b"
        },
        "id": "l3fQBu9N5O7oMibni",
        "url": "https://giphy.com/gifs/kpop-k-pop-k-pop-l3fQBu9N5O7oMibni",
        "title": ""
    },
    "_id": "63ecf5a13ff0610f893f1689",
    "email": "kevin@admin.com",
    "password": "$2b$11$lM4EETSiY7dJvaIcz0e3pOM1jHSKLtlPIln/1cMNfcyOnXlpi.auO",
    "interests": [],
    "matches": [
        "6408b0f86c183848503dfa58"
    ],
    "blocked": [],
    "isFake": false,
    "createdAt": "2023-02-15T15:09:21.631Z",
    "updatedAt": "2023-02-15T15:09:21.631Z",
    "questions": [],
    "likedBy": [
        {
            "userID": "63cd944a730b489a1efc00da",
            "statelike": "like"
        }
    ],
    "__v": 66,
    "isAdmin": true,
    "likes": [
        {
            "userID": "63cd944a730b489a1efc00da",
            "statelike": "like"
        },
        {
            "userID": "63d057b3cfc970c2c3198280",
            "statelike": "dislike"
        },
    ],
    "firebaseToken": []
}
```

### Login a user's profile

URL: /api/auth/login

Method: POST

Request data:

```json
{
  "name": "damien@test.com",
  "email": "testtest",
}
```

Example response:

```json
{
    "message": "User 63cd944a730b489a1efc00da successfully logged in",
    "auth": true,
    "userId": "63cd944a730b489a1efc00da",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2Q5NDRhNzMwYjQ4OWExZWZjMDBkYSIsImlhdCI6MTY4NDE0MzIzMH0.eWtg_bIQQt9azTRG6rUoZlDOc8FDfo8qXlaU30TMHTo"
}
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Authors

- [Kévin ALVES](@KevOneRedOne)
- [Yanis DJOUDI](@Tadayoshi123)
- [Damien DROZD](@DamienDrozd)
- [Clément LANNERETONNE](@clement-lnr)
- [Axel PELERIN](@apelerin)
- [PEEL Organisation - Teams](@PeelOrganisation)


