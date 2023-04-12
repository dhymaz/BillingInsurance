FROM ubuntu:18.04
FROM node:latest
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
RUN apt update
RUN apt install -y git