# based image yang akan digunakan
FROM node:18.16

ENV REDIS_URL=redis://default:TVQndqW8EIIez7IR8RYd85wPM8yiLH2K@redis-13845.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:13845
ENV NODE_ENV=production
ENV APP_SERVER_URL=http://localhost:4002
ENV USER_SERVER_URL=http://localhost:4001

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /orchestrator-graphql

# copy deps yang ada di apps ke WORKDIR
COPY ["package.json", "package-lock.json", "./"]

# Install npm & Mengapus cache
RUN npm install

# copy semua file & folder ke WORKDIR
COPY . .

# execute apps: production
CMD ["npm", "run", "start"]