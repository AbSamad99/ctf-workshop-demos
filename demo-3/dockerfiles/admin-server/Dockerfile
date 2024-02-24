FROM ubuntu:latest

RUN apt-get update && \
    apt-get install -y openssh-server sudo

ARG USER1 \
    USER2 \
    PASSWORD1 \
    PASSWORD2

RUN mkdir /run/sshd && \
    useradd -m -s /bin/bash $USER1 && \
    useradd -m -s /bin/bash $USER2 && \
    echo "$USER1:$PASSWORD1" | chpasswd && \
    echo "$USER2:$PASSWORD2" | chpasswd && \
    usermod -aG sudo $USER1

USER $USER1
WORKDIR /home/$USER1
RUN touch .sudo_as_admin_successful

USER $USER2
WORKDIR /home/$USER2
COPY ./secret.txt ./secret.txt

USER root

CMD [ "/usr/sbin/sshd", "-D" ]