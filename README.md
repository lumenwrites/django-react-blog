This is a very simple blog built with Django, Django REST Framework, React/Redux, and Bootstrap, deployed with Docker, and served with nginx-uwsgi. It can be useful as an example of integrating Django with React, as a starter project, or as a beautiful and simple blogging tool =)

I have built this project by following [these](https://www.udemy.com/react-redux/)  [two](https://www.udemy.com/react-redux-tutorial/) awesome React courses, I highly recommend them to anybody who wants to learn React! [This](https://teamtreehouse.com/library/django-rest-framework)  Django REST Framework course really helped me to build the backend, and [this](https://www.udemy.com/docker-tutorial-for-devops-run-docker-containers/) course was incredibly helpful for learning Docker.

I have tried to extensively comment the code, so you could easily understand what's going on, and apply it to your own projects.

This is my first project built with all this tech, so if you have suggestions on how to improve it - I'd really appreciate them. I will keep gradually improving this blog and adding more features. Feel free to  contribute to this project, report bugs, or fork it and use it for your purposes. I hope you will find it useful!

You can always contact me at raymestalez@gmail.com, and you can check out the other stuff I'm working on [over here](http://rayalez.com).

<!-- 
You can check out the demo [here](). You can [login]() with username "admin" and password "1234" to try creating and editing posts(please be nice, don't post anything that might offend anybody).
 -->

![Screenshot](https://raw.githubusercontent.com/raymestalez/django-react-blog/master/assets/blog-screenshot-2.png)

![Screenshot](https://raw.githubusercontent.com/raymestalez/django-react-blog/master/assets/blog-screenshot-3.png)


## Installation

Installing and running this blog is very simple. Clone this repo, and then simply run:

	docker-compose build && docker-compose up -d

After that, the blog will be running on the localhost. Isn't Docker amazing? =)

You will also need to attach to the container by running this:

	docker exec -i -t backend  /bin/bash

run migrations:

	python3.5 manage.py migrate

and create an admin user with:

	python3.5 manage.py createsuperuser

Now you can go to localhost/login url, login and begin blogging!

To deploy it online, go to Digital Ocean, create a Docker droplet, and repeat the same commands. Then you will need to go to the networking tab, and create two A records pointing to the droplet:

	yourawesomeblog.com
	api.yourawesomeblog.com

Like so:

![Screenshot](https://raw.githubusercontent.com/raymestalez/django-react-blog/master/assets/dns-records.png)

