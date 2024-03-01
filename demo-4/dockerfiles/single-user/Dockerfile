FROM ubuntu:latest

SHELL ["/bin/bash", "-c"]

RUN apt-get update && \
    apt-get install -y openssh-server dnsutils iputils-ping

ARG USER \
    PASSWORD \
    HINT \
    FLAG

RUN mkdir /run/sshd && \
    useradd -m -s /bin/bash $USER && \
    echo "$USER:$PASSWORD" | chpasswd
    
RUN if [ -n "$HINT" ]; then \
        echo "$HINT" >> /home/$USER/hint.txt; \
    fi

RUN if [ -n "$FLAG" ]; then \
        echo "$FLAG" >> /home/$USER/flag.txt; \
    fi

EXPOSE 22

CMD [ "/usr/sbin/sshd", "-D" ]