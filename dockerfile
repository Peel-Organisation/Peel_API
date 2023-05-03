FROM node:alpine as base

WORKDIR /app

COPY ./build ./build

COPY ./package.json ./package.json

COPY ./.env ./.env

COPY ./.firebaserc ./.firebaserc

COPY ./firebase-service-account-key.json ./firebase-service-account-key.json

COPY ./firebase.json ./firebase.json

RUN npm install --production

EXPOSE 3000
CMD ["npm", "run", "start"]
