FROM node:16.20.2-bullseye-slim

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .