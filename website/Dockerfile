FROM node:21

WORKDIR .

COPY package.json .

RUN npm install

RUN npm install --save react-scripts

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
