import React, { Component } from 'react';
import { Link } from 'react-router';
import { Panel, Label } from 'react-bootstrap';

import Remarkable from 'remarkable';

export default class Post extends Component {
    renderPostHeader () {
	if (this.props.link ) {
	    return (
		<h1>
		    <Link to={this.props.link}>
			{this.props.title}
		    </Link>
		</h1>
	    );
	} else {
	    return (
		<h1>
		    {this.props.title}
		</h1>		
	    );
	}
    }


    renderBody () {
	var body = this.props.body;
	var truncated = body.split(" ").splice(0,this.props.truncate).join(" ");
	if (this.props.truncate && body > truncated) {
	    body = truncated;
	}
	
	const md = new Remarkable();
	const markdown = md.render(body);
	return (
	    <div dangerouslySetInnerHTML={{__html:markdown}} />
	);
    }

    
    renderReadMore () {
	var body = this.props.body;	
	var truncated = body.split(" ").splice(0,this.props.truncate).join(" ");
	if (this.props.truncate  && body > truncated) {
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

    renderFooter () {
	const { tags } = this.props;
	if (tags && tags.length > 0) {
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
		<div className="post-footer">
		    { tagItems }
		    <div className="right">
			<Link className="black" to={'http://rayalez.com'} >
			    @rayalez
			</Link>
		    </div>
		</div>
	    );
	} else {
	    return (
		<div></div>
	    );
	}
	
    }

    render() {
	return (
	    <div>
		<article className="post panel panel-default">
		    {this.renderPostHeader()}
		    <hr/>

		    <div>
			{this.renderBody()}
			
			{this.renderReadMore()}			
		    </div>
		    <br/>
		    {this.renderFooter()}			
		</article>
	    </div>	    
	);
    }
}


