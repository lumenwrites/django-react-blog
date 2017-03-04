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
RUN apt-get install -y nodejs <

# Copy project files into /home/blog folder.
RUN mkdir -p $PROJECTDIR
WORKDIR $PROJECTDIR
COPY . .

WORKDIR $FRONTENDDIR
RUN npm install		
# Port to expose
EXPOSE 8080

# CMD [ "npm", "start" ]

       
# From here:
# Create application subdirectories
# WORKDIR $DOCKYARD_SRVHOME
# RUN mkdir media static logs
# VOLUME ["$DOCKYARD_SRVHOME/media/", "$DOCKYARD_SRVHOME/logs/"]

ENV SECRET_KEY "7-pwxu4=a0th_s$)8)#z5f-^jlsn_^rg@l+r6$b0)!yfji6m13"
ENV PG_USERNAME "blog_user"
ENV PG_PASS "1234"

# Install Python dependencies
WORKDIR $BACKENDDIR
RUN pip3 install -r $BACKENDDIR/requirements.txt
RUN pip3 install uwsgi

RUN echo "daemon off;" >> /etc/nginx/nginx.conf
COPY nginx-app.conf /etc/nginx/sites-available/default
COPY supervisor-app.conf /etc/supervisor/conf.d/ 
COPY uwsgi.ini $PROJECTDIR
COPY uwsgi_params $PROJECTDIR
# Port to expose
EXPOSE 8000

# Copy entrypoint script into the image
WORKDIR $PROJECTDIR

CMD ["supervisord", "-n"]
