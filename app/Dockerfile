FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

CMD ["sh", "-c", "npm run dev"]