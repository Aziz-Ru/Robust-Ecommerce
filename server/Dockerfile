FROM node:22.12-slim
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app

EXPOSE 3000
CMD ["npx","ts-node", "src/index.ts"]