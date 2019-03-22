# Original author Ray Alez

FROM ubuntu:18.04
MAINTAINER "Ilja Leiko" <leikoilja@gmail.com>

ENV HOMEDIR=/home
ENV PROJECTDIR=/home/blog
ENV BACKENDDIR=/home/blog/backend


################################################
# BASIC APPS
################################################

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y emacs
RUN apt-get install -y git
RUN apt-get install -y iputils-ping
RUN apt-get install -y nginx
RUN apt-get install -y supervisor
RUN apt-get install -y libpq-dev
RUN apt-get install -y libcurl4-openssl-dev
RUN apt-get install -y libcurl4-openssl-dev
RUN apt-get install -y libssl-dev

################################################
# PYTHON / DJANGO DEPENDENCIES
################################################
RUN apt-get install -y python3-dev
RUN apt-get install -y python3-pip
RUN apt-get install -y build-essential
RUN apt-get install -y uwsgi-plugin-python3


################################################
# PIP REQUIREMENTS
################################################

RUN pip3 install -U pip setuptools
RUN pip3 install uwsgi

# Copy and Install requirements
# (before copying the rest of the code, so docker would cache them and not reinstall)
WORKDIR $BACKENDDIR
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Copy all project files
COPY . .


################################################
# NGINX/UWSGI
# https://github.com/dockerfiles/django-uwsgi-nginx
# https://uwsgi.readthedocs.org/en/latest/tutorials/Django_and_nginx.html
################################################

RUN echo "daemon off;" >> /etc/nginx/nginx.conf
COPY config/backend_nginx.conf /etc/nginx/sites-available/default
COPY config/supervisor.conf /etc/supervisor/conf.d
COPY config/uwsgi.ini $PROJECTDIR
COPY config/uwsgi_params $PROJECTDIR
