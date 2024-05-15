FROM nginx

WORKDIR /usr/local/bin

COPY ./dist /usr/share/nginx/html

COPY ./default.conf /etc/nginx/conf.d/



