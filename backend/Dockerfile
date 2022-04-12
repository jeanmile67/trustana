FROM node:16

# Create app directory
WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN yarn install

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "node", "app.js" ]
