import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { PageHeader, Panel, Label } from 'react-bootstrap';


export default class Post extends Component {
    readMore() {
	if (this.props.link) {
	    return (
		<div>
		    <Link to={this.props.link} className="readMore"> Read more...</Link>
		</div>
	    );
	}
    }

    postTitle() {
	if (this.props.link) {
	    return (
		<h2>
		    <Link to={this.props.link}>
			{this.props.title}
		    </Link>
		</h2>
	    );
	};

	return (
	    <h2>
		{this.props.title}
	    </h2>
	);	    
    }



    render() {

	const { tags } = this.props;
	const tagItems = tags.map((tag) => {
	    return (
		<span key={tag}>
		  <Label bsStyle="default">
		    {tag}
		  </Label>
		  &nbsp;
		</span>
	    );
	});
	
	return (
	    <div>
		<Panel className="post">

		    {this.postTitle()}
		    <hr/>

		    <div>
			{this.props.body}
			{this.readMore()}
		    </div>
		    <br/>

		    { tagItems }
		</Panel>
	    </div>	    
	);
    }
}


