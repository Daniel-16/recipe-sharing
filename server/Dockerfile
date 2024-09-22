# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=21.6.1

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production


WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# Add these lines before the RUN npm run build command
# USER root
# RUN mkdir -p .next && chown -R node:node .next
USER node

# # Build the application
# RUN npm run build

# Expose the port that the application listens on.
EXPOSE 5000

# Run the application.
CMD npm start
