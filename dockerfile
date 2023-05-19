FROM node:alpine as base

WORKDIR /app

COPY . .

RUN rm -rf node_modules && npm install

RUN npm run build

# RUN rm -rf ./src

EXPOSE 3001
CMD ["npm", "run", "start"]
