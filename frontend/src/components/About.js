import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PageHeader, Panel } from 'react-bootstrap';

import Post from './Post';


export default class About extends Component {
    render() {
	return (
	    <div>
		<br/>
		<Post title="About" body="Welcome to my blog!!"/>	
	    </div>	    
	);
    }
}


