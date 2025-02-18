# Stage 1: Build the app (Opcional - si tienes un comando de build)
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build # Si tienes un comando de build

# Stage 2: Create the final image
FROM node:20-alpine
WORKDIR /usr/src/app

# Si usas multi-stage build:
COPY --from=build /usr/src/app/dist ./ # Copia solo los archivos necesarios (adapta a tu build)
COPY --from=build /usr/src/app/node_modules ./

# Si NO usas multi-stage build:
# COPY package*.json ./
# RUN npm ci --only=production
# COPY . .  <- Esta línea se elimina para no copiar .env

EXPOSE 8080
CMD [ "node", "index.js" ]