FROM nginx:1.12.0-alpine
MAINTAINER canknow <3230525823@qq.com>

WORKDIR /app
COPY . /app/

RUN cp -r dist/*  /usr/share/nginx/html/ && rm -rf /app
EXPOSE 80
CMD ["nginx","-g", "daemon off;"]
