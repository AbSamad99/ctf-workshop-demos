FROM ubuntu:latest

SHELL ["/bin/bash", "-c"]

RUN apt-get update && \
    apt-get install -y openssh-server dnsutils iputils-ping

ARG USER1 \
    USER2 \
    PASSWORD1 \
    PASSWORD2 \
    HINT1 \
    HINT2

RUN mkdir /run/sshd && \
    useradd -m -s /bin/bash $USER1 && \
    useradd -m -s /bin/bash $USER2 && \
    echo "$USER1:$PASSWORD1" | chpasswd && \
    echo "$USER2:$PASSWORD2" | chpasswd && \
    usermod -aG sudo $USER1

RUN if [ -n "$HINT1" ]; then \
        echo "$HINT1" >> /home/$USER1/hint.txt; \
    fi

RUN if [ -n "$HINT2" ]; then \
        echo "$HINT2" >> /home/$USER2/hint.txt; \
    fi

EXPOSE 22

CMD [ "/usr/sbin/sshd", "-D" ]