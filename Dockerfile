FROM node:8.12.0-alpine

# Install app dependencies
COPY package.json /www/package.json
RUN cd /www; npm install --silent

# Copy app source
COPY . /www

# Set work directory to /www
WORKDIR /www

# set your port
ENV PORT 8080

# expose the port to outside world
EXPOSE  8080

# start command as per package.json
CMD ["npm", "start"]
