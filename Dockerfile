FROM node:18

WORKDIR /src

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 2810

CMD ["npm", "start"]