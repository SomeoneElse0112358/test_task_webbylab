FROM node:16.15.0

WORKDIR /test_task_webbylab

COPY  . .

RUN npm install

