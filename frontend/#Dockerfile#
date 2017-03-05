FROM ubuntu:latest

# Set the file maintainer (your name - the file's author)
MAINTAINER Ray Alez

ENV HOMEDIR=/home
ENV PROJECTDIR=/home/blog
ENV FRONTENDDIR=/home/blog/frontend

# Install Nginx.	
RUN apt-get update && apt-get install -y nginx

# Turn off daemon mode
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf
RUN rm /etc/nginx/sites-enabled/default

# Copy frontend files
WORKDIR $FRONTENDDIR
COPY . .

# Copy nginx config
COPY frontend_nginx.conf /etc/nginx/sites-enabled

# Restart nginx
# RUN /etc/init.d/nginx restart

# Define default command.
CMD ["nginx"]

# Expose ports.
EXPOSE 80
       
