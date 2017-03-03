import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { PageHeader, Panel, Label } from 'react-bootstrap';


export default class Post extends Component {
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
		<article className="post panel panel-default">

		    <h2>
			<Link to={this.props.link}>
			    {this.props.title}
			</Link>
		    </h2>
		    <hr/>

		    <div>
			{this.props.body}
			<div>
			    <Link to={this.props.link}
				  className="readMore"> Read more...</Link>
			</div>
		    </div>
		    <br/>

		    { tagItems }
		</article>
	    </div>	    
	);
    }
}


