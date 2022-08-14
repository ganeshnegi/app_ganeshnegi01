FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

EXPOSE 7100

CMD [ "npm", "start"]