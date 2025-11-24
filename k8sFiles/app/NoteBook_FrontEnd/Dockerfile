FROM node:20.0.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci 
COPY . . 
RUN npm install build 
EXPOSE 3000
CMD ["npm", "start"]
# this dockerfile absolutely works
# the only problem was exposed wrong port node js is on 3000
# and run command -p 3000:3000 while starting a conatiner service