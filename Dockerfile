# Usa una imagen oficial de Node como base
FROM node:24-alpine

# Instala dependencias del sistema (útiles en dev)
RUN apk add --no-cache bash

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./

ENV SKIP_HOOKS=1

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto (ajústalo según tu frontend, 5173 para Vite, 4200 para Angular, 3000 para React CRA)
EXPOSE 5173

# Comando por defecto: inicia en modo dev
CMD ["npm", "run", "dev"]
