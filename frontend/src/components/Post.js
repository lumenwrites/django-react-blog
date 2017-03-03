import React, { Component } from 'react';
import { Link } from 'react-router';
import { Panel, Label } from 'react-bootstrap';


export default class Post extends Component {
    renderPostHeader () {
	if (this.props.link ) {
	    return (
		<h2>
		    <Link to={this.props.link}>
			{this.props.title}
		    </Link>
		</h2>
	    );
	} else {
	    return (
		<h2>
		    {this.props.title}
		</h2>		
	    );
	}
    }

    renderReadMore () {
	if (this.props.link ) {
	    return (
		<div>
		    <Link to={this.props.link}
			  className="readMore"> Read more...</Link>
		</div>
	    );
	} else {
	    return (
		<div>
		</div>
	    );
	}
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
		<article className="post panel panel-default">
		    {this.renderPostHeader()}
		    <hr/>

		    <div>
			{this.props.body}
			{this.renderReadMore()}			
		    </div>
		    <br/>

		    <div className="post-footer">
			{ tagItems }
			<div className="right">
			    <Link className="black" to={'http://rayalez.com'} >
				@rayalez
			    </Link>
			</div>
		    </div>
		</article>
	    </div>	    
	);
    }
}


