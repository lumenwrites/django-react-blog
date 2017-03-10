import React, { Component } from 'react';
import { Link } from 'react-router';
import { Panel, Label } from 'react-bootstrap';

import Remarkable from 'remarkable';

import FontAwesome from 'react-fontawesome';

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

    renderPostEdit () {
	if (this.props.authenticated ) {
	    return (
		<Link to={"/post/"+this.props.slug+"/edit"}>
		    <FontAwesome name='pencil' className="button-edit" />
		</Link>
	    );
	} else {
	    return (
		null
	    );
	}
    }

    renderDraftLabel () {
	if (!this.props.published ) {
	    return (
		<Label bsStyle="default" className="label-draft">
		    Draft
		</Label>
	    );
	} else {return (null);}
    }
    

    renderBody () {
	var body = this.props.body;
	var truncated = body.split(" ").splice(0,this.props.truncate).join(" ");
	if (this.props.truncate && body > truncated) {
	    body = truncated;
	}
	
	const md = new Remarkable({html: true});
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
	const { tags, category } = this.props;
	/* If there's no tags and no category - return empy div */
	if (!(tags && tags.length > 0 || category)){ return (<div></div>); }

	var tagItems = "";
	var categoryItem = "";

	/* If there are some tags - generate tagItems  */
	if (tags && tags.length > 0) {
	    tagItems = tags.map((tag) => {
		return (
		    <span key={tag.slug}>
			<Label bsStyle="default">
			    {tag.title}
			</Label>
			&nbsp;
		    </span>
		);
	    });
	}

	/* If there's a category - generate a category item */
	if (category) {
	    categoryItem = (
		<span>
		    <Link to={'/category/' + category.slug}>
			<Label bsStyle="default">
			    {category.title}
			</Label>
		    </Link>
		    &nbsp;
		</span>
	    );
	}

	return (
	    <div className="post-footer">
		{ categoryItem }		
		{ tagItems }
		<div className="right">
		    <Link className="black" to={'http://rayalez.com'} >
			@rayalez
		    </Link>
		</div>
	    </div>
	);
    }

    render() {
	return (
	    <div>
		<article className="post panel panel-default">
		    {this.renderPostEdit()}
		    {this.renderDraftLabel()}
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


