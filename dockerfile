FROM nginx:latest

COPY . /var/www/html/tictactoe
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080:80


