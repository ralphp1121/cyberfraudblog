FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx @11ty/eleventy

FROM nginx:alpine
COPY --from=build /app/_site /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN sed -i -e 's#pid *.*#pid /tmp/nginx.pid;#' -e '/^user  *nginx;/d' /etc/nginx/nginx.conf \
    && mkdir -p /var/cache/nginx/client_temp /var/cache/nginx/proxy_temp \
             /var/cache/nginx/fastcgi_temp /var/cache/nginx/uwsgi_temp \
             /var/cache/nginx/scgi_temp \
    && chown -R nginx:nginx /var/cache/nginx /usr/share/nginx/html /tmp /etc/nginx/conf.d
USER nginx
EXPOSE 8080
