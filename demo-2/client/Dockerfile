FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y npm curl && \
    npm i -g n && \
    n lts

WORKDIR /tmp
COPY ./code ./code
RUN cd ./code && \
    npm i

WORKDIR /tmp/code

CMD [ "npm", "start" ]