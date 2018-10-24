FROM node:8-alpine
WORKDIR /usr/src/app

COPY package.json ./
RUN yarn install --prod
COPY . .

RUN chmod 700 start.sh

EXPOSE 3000
CMD ./start.sh