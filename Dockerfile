FROM node:8
WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install
COPY . .

RUN apt-get update &&\
    apt-get install dos2unix &&\
    dos2unix start.sh

EXPOSE 3000
CMD ./start.sh