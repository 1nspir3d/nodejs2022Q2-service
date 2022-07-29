FROM node:16-alpine 

WORKDIR /app

COPY package*.json .

RUN npm install -f

COPY . .

EXPOSE ${PORT}