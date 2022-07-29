FROM node:16-alpine 

WORKDIR /app

COPY package*.json .

RUN npm install -f

COPY . .

EXPOSE 4000

RUN npm run build