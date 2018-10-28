FROM node:8-slim
WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install
COPY . .

RUN chmod 700 start.sh

EXPOSE 3000
CMD ./start.sh