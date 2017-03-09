import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';


export default class Footer extends Component {
    render() {
	return (
	    <footer className="footer">
		<div className="right credit">
		    Made by <a href="http://rayalez.com">Ray Alez</a>
		    <a href="https://github.com/raymestalez/django-react-blog">
			<FontAwesome name='github' />
		    </a>
		</div>
	    </footer>
	);
    }
}

