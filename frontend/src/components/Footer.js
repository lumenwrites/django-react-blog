import React, { Component } from 'react';



export default class Footer extends Component {
    render() {
	return (
	    <footer className="footer">
		<div className="right credit">
		    Made by <a href="http://rayalez.com">Ray Alez</a>
		    <a href="https://github.com/raymestalez/django-react-blog">
			<i className="fa fa-github"></i>
		    </a>
		</div>
	    </footer>
	);
    }
}

