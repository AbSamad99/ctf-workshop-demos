FROM ubuntu:latest

RUN apt-get update && apt-get install -y openssh-server nano

RUN mkdir /run/sshd && \
    useradd -m -s /bin/bash hisab && \
    echo "hisab:password123" | chpasswd 

USER hisab
WORKDIR /home/hisab
RUN echo "flag{12345}" > ./.flag

USER root

CMD [ "/usr/sbin/sshd", "-D"]