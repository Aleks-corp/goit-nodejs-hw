FROM node:18.15
WORKDIR /app
COPY . .
RUN yarn
EXPOSE 3000
CMD [ "node", "./server.js" ]