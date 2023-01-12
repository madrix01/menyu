FROM node:gallium-bullseye-slim

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .