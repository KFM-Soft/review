FROM node:22-slim AS build
COPY . /home/app/
RUN npm install -g @angular/cli@17
WORKDIR /home/app/
RUN npm install && ng build
RUN ls -lh /home/app/dist/front-end/assets/images/

FROM nginx:stable-alpine-slim
COPY --from=build /home/app/dist/front-end/* /usr/share/nginx/html
COPY --from=build /home/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80