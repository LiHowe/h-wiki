FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# 暴露端口
EXPOSE 7001

CMD ["npm", "start"]
