FROM node:16

# Create app directory
WORKDIR /usr/src/app/frontend

COPY package*.json ./

RUN yarn install

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["yarn", "start"]
