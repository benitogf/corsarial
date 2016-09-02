FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/corsarial
RUN mkdir -p /usr/src/corsarial/platforms
WORKDIR /usr/src/corsarial

# Install app dependencies
COPY package.json /usr/src/corsarial/
RUN npm install -g hotpot


# Bundle app source
COPY platforms/browser /usr/src/corsarial/platforms/browser
COPY www /usr/src/corsarial/www
COPY config.xml /usr/src/corsarial
COPY index.js /usr/src/corsarial

EXPOSE 9000
CMD [ "npm", "run", "server" ]
