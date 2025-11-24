FROM node:20.0.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci 
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]