FROM node:lts-alpine as build-stage

WORKDIR /app

# Копируем скрипт
COPY docker/entrypoint.sh .

# Делаем его исполняемым
RUN chmod +x entrypoint.sh

# Остальные шаги сборки
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/config.js /usr/share/nginx/html/config.js
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
