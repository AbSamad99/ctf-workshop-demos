FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y openssh-server dnsutils iputils-ping

ARG USER \
    PASSWORD

RUN mkdir /run/sshd && \
    useradd -m -s /bin/bash $USER && \
    echo "$USER:$PASSWORD" | chpasswd

USER $USER
WORKDIR /home/$USER
COPY ./note.txt ./note.txt
COPY ./password.txt ./password.txt

USER root

CMD [ "/usr/sbin/sshd", "-D" ]