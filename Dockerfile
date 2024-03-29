# FROM node:12
FROM node:20.11.1-alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install ci --only=production

COPY . .

EXPOSE 28275

CMD [ "node", "index.js" ]

# docker build -t 192.168.1.55:5000/srapoc:1.0 .
# docker push 192.168.1.55:5000/srapoc:1.0
# docker run -p 4500:28275 -d --name srapoc 192.168.1.55:5000/srapoc:1.0

## en caso que querer poner la imagen en el cluster
# kubectl -n fabricio rollout restart deployment srapoc
