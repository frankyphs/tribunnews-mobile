# based image yang akan digunakan
FROM node:18.16

ENV MONGODB=mongodb+srv://frankyphs:0fNwUAnaNFHQKm9b@cluster0.yqi5nii.mongodb.net/
ENV NODE_ENV=production
ENV PORT=4001

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /users

# copy deps yang ada di apps ke WORKDIR
COPY ["package.json", "package-lock.json", "./"]

# Install npm & Mengapus cache
RUN npm install

# copy semua file & folder ke WORKDIR
COPY . .

# execute apps: production
CMD ["npm", "run", "start"]