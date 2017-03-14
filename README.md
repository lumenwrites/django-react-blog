This is a very simple blog built with Django, Django REST Framework, React/Redux, and Bootstrap, deployed with Docker, and served with nginx-uwsgi. It can be useful as an example of integrating Django with React, as a starter project, or as a beautiful and simple blogging tool =)

I have built this project by following [these](https://www.udemy.com/react-redux/)  [two](https://www.udemy.com/react-redux-tutorial/) awesome React courses, I highly recommend them to anybody who wants to learn React! [This](https://teamtreehouse.com/library/django-rest-framework)  Django REST Framework course really helped me to build the backend, and [this](https://www.udemy.com/docker-tutorial-for-devops-run-docker-containers/) course was incredibly helpful for learning Docker.

I have tried to extensively comment the code, so you could easily understand what's going on, and apply it to your own projects.

This is my first project built with all this tech, so if you have suggestions on how to improve it - I'd really appreciate them. I will keep gradually improving this blog and adding more features. Feel free to  contribute to this project, report bugs, or fork it and use it for your purposes. I hope you will find it useful!

You can always contact me at raymestalez@gmail.com, and you can check out the other stuff I'm working on [over here](http://rayalez.com).

<!-- 
You can check out the demo [here](). You can [login]() with username "admin" and password "1234" to try creating and editing posts(please be nice, don't post anything that might offend anybody).
 -->

![Screenshot](https://raw.githubusercontent.com/raymestalez/django-react-blog/master/assets/blog-screenshot-2.png)

![Screenshot](https://raw.githubusercontent.com/raymestalez/django-react-blog/master/assets/blog-screenshot-5.png)



## Installation

Installing and running this blog is very simple. Clone this repo, and then simply run:

	docker-compose up
	(use -d flag to run it in the background)

After that, the blog will be running on the localhost. Isn't Docker amazing? =)

You will also need to attach to the container by running this:

	docker exec -i -t backend  /bin/bash

run migrations:

	python3.5 manage.py migrate

and create an admin user with:

	python3.5 manage.py createsuperuser

Now you can go to localhost/login url, login and begin blogging!

Important: Before running it on the server, go to backend/config/env, and change "SECRET_KEY" and "POSTGRES\_PASSWORD" to something unique.

To deploy it online, go to Digital Ocean, create a Docker droplet, and repeat the same commands. Then you will need to go to the networking tab, and create two A records pointing to the droplet:

	yourawesomeblog.com
	api.yourawesomeblog.com

Like so:

![Screenshot](https://raw.githubusercontent.com/raymestalez/django-react-blog/master/assets/dns-records.png)


You can also go to:

    api.yourawesomeblog.com/admin

to access the admin panel. You can add categories there, if you want to better organize your posts, and you can create a settings object where you can add an about page and fill in the meta info(site title, keywords, etc).

# Todo

## Upcoming features
- [X] Core settings. Meta info, analytics, about page.
- [X] Categories
- [X] Filter by tags.
- [X] Drafts
- [X] Email subscriptions.
- [X] Pagination.
- [ ] Server side rendering.
- [ ] Proper form validation.
- [X] RSS

## Bugs
- [X] Sometimes post editor toolbar is yellow
- [X] After clicking on post, it doesn't always scroll to the beginning of the page, though it should.

## Devops
- [X] Don't expose 8000/8080 ports. Access them only with the nginx container.
- [ ] Separate docker-compose files for production and development.
- [ ] Compile and serve frontend files from the /dist directory.
- [ ] Properly use Docker Volume API. Like [here](https://github.com/quecolectivo/server/blob/master/docker-compose-prod.yml#L12)  
- [ ] Learn to backup DB.
- [ ] Maybe: Copy the code into container instead of using voulmes(if it has advantaeges).
- [ ] Chain together RUN commands in the Dockerfile, for efficiency.

## Future/Maybe
- Auto Saving.
- Code syntax highlighting? IPython? MathJax?  
- Create settings page where you can fill in meta info and create categories.
- Figure out how to properly run multiple instances of the blog on one server.
- Create page that allows you to just send emails, like on medium?  
  //or just customize a notification email about new posts.
- Themes?
- Hosting?
- Export/Import data?
- Add nested comments?
- Image upload?


# Clean up
- Pass all the speed tests.  
  https://developers.google.com/speed/pagespeed/insights/  
  https://tools.pingdom.com/  
  https://gtmetrix.com/  
- Pass all mobile tests  
  https://search.google.com/search-console/mobile-friendly
- Pass all SEO tests  
  https://seositecheckup.com
- Write tests
- Migrate automatically. entrypoint.sh?



