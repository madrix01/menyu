FROM node:16.19.1-bullseye-slim

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .