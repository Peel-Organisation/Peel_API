# Author: Peel-Organisation
# Construction step
FROM node:alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Production step
FROM node:alpine as production

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.firebaserc ./.firebaserc
COPY --from=build /app/firebase.json ./firebase.json

RUN npm install

EXPOSE 3000
CMD ["npm", "run", "start"]
