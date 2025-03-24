FROM nginx:latest

COPY . /var/www/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080:80


