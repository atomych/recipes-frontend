FROM node:lts-alpine as build-stage

WORKDIR /frontend

COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-stage /frontend/dist /usr/share/nginx/html
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod +x /usr/local/bin/entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
