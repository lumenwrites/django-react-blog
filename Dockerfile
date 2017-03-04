FROM ubuntu:latest
# Set the file maintainer (your name - the file's author)
MAINTAINER Ray Alez
	
# Set env variables used in this Dockerfile (add a unique prefix, such as DOCKYARD)
# Directory in container for all project files
ENV HOMEDIR=/home
# Directory in container for project source files
ENV PROJECTDIR=/home/blog
ENV FRONTENDDIR=/home/blog/frontend
ENV BACKENDDIR=/home/blog/backend	

# Install basic apps
RUN apt-get update && apt-get install -y git emacs curl iputils-ping
# Install python/django dependencies 	        	    
RUN apt-get install -y python python3-dev python3-pip supervisor nginx libpq-dev libcurl4-openssl-dev libtiff5-dev libjpeg8-dev zlib1g-dev libfreetype6-dev liblcms2-dev libwebp-dev tcl8.6-dev tk8.6-dev python-tk
# Install node 7
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs
# Install django 2.0
# RUN git clone git://github.com/django/django.git
# RUN pip3 install -e django/    	
    	    

# Using volumes in docker compose instead!
# Copy project files into /home/blog folder.
# RUN mkdir -p $PROJECTDIR
# WORKDIR $PROJECTDIR
# COPY . .

# Install Frontend dependencies
WORKDIR $FRONTENDDIR
RUN npm install		

# Install Backend dependencies
WORKDIR $BACKENDDIR
RUN pip3 install -r $BACKENDDIR/requirements.txt
RUN pip3 install uwsgi

# Set secret variables (what's the right way to do this that doesn't commit them to git?)
ENV SECRET_KEY "7-pwxu4=a0th_s$)8)#z5f-^jlsn_^rg@l+r6$b0)!yfji6m13"
ENV PG_USERNAME "blog_user"
ENV PG_PASS "1234"

# Configuring and serving django (no idea how it works so far)
# WORKDIR $PROJECTDIR
# RUN echo "daemon off;" >> /etc/nginx/nginx.conf
# COPY ./config/blog_backend_nginx.conf /etc/nginx/sites-available/default
# COPY ./config/supervisor.conf /etc/supervisor/conf.d/ 
# COPY ./config/uwsgi.ini $PROJECTDIR/config/
# COPY ./config/uwsgi_params $PROJECTDIR
# Port to expose
# EXPOSE 8000

# WORKDIR $PROJECTDIR
# CMD ["supervisord", "-n"]
	

# Serving frontend with nginx [TODO]
# Port to expose
# EXPOSE 8080

# Start frontend test server
# CMD [ "npm", "start" ]
	
