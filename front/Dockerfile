FROM node:latest
WORKDIR /app
COPY package*.json /app/
RUN npm install
ADD ./ /app/
RUN npm run build
CMD npm run server