# Gunakan image dari docker community yang sudah ada, disini menggunakan alpine-linux yang sudah terinstal node versi 18.15
FROM node:19

WORKDIR /app

COPY . .

# RUN npm run build

# Definikan port yang akan digunakan dalam container docker
EXPOSE 3000

# Jalankan npm run start di terminal
CMD ["npm", "start"]