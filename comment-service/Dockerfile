FROM node:17-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm install

EXPOSE 4001

CMD ["npm", "run", "dev"]