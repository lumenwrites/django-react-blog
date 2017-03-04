FROM ubuntu:latest
# Set the file maintainer (your name - the file's author)
MAINTAINER Ray Alez

ENV HOMEDIR=/home
ENV PROJECTDIR=/home/blog
ENV BACKENDDIR=/home/blog/backend

# Install basic apps
RUN apt-get update && apt-get install -y git emacs curl iputils-ping

# Install python/django dependencies 	        	    
RUN apt-get install -y python3-dev python3-pip build-essential supervisor nginx libpq-dev uwsgi-plugin-python3 libcurl4-openssl-dev
    	    
# Install requirements
WORKDIR $BACKENDDIR
COPY . .		
RUN pip3 install -r $BACKENDDIR/requirements.txt
RUN pip3 install uwsgi

# RUN echo "daemon off;" >> /etc/nginx/nginx.conf    	 
# COPY ../config/blog_backend_nginx.conf /etc/nginx/sites-available/default
# COPY ../config/supervisor.conf /etc/supervisor/conf.d/
# COPY ../config/uwsgi.ini $PROJECTDIR
# COPY ../config/uwsgi_params $PROJECTDIR


# CMD ["supervisord", "-n"]
