FROM nginx:1.20.2
COPY build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf