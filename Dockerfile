# PRODUCTION DOCKERFILE
# ---------------------
# This Dockerfile allows to build a Docker image of the NestJS application
# and based on a NodeJS 13 image. The multi-stage mechanism allows to build
# the application in a "builder" stage and then create a production
# image containing the required dependencies and the JS build files.

# For manual build you can execute:
# docker build . --target=deployment --name=aicos-nestjs:4.0.1

#----------------------
#   Building stage
#----------------------

FROM node:13.7 AS builder

ENV TZ=America/Havana
ENV COMPOSE_HTTP_TIMEOUT=200
ARG NODE_ENV=dev
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

# RUN yarn global add @nestjs/cli

# uncomment the line below and add node_modules to .dockerignore
RUN yarn install

COPY . .

#----------------------
#   Linting stage
#----------------------

FROM node:13.7 AS linting

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app ./

RUN ["yarn", "lint"]

#----------------------
#   Static Analysis stage
#----------------------

# Gets Sonarqube Scanner from Dockerhub and runs it
FROM newtmitch/sonar-scanner:latest as sonarqube
COPY --from=builder /usr/src/app/src /root/src

#----------------------
#   Unit Testing stage
#----------------------

# Runs Unit Tests
FROM node:13.7 AS unit-tests

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/ .

RUN ["yarn", "test"]

#----------------------
#   Deployment stage
#----------------------

FROM node:13.7 AS deployment

ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

COPY --from=builder /usr/src/app/dist ./
COPY --from=builder /usr/src/app/package* ./
COPY --from=builder /usr/src/app/yarn.lock ./

RUN yarn install --prod

COPY . .

EXPOSE 3000


CMD ["node", "dist/main"]