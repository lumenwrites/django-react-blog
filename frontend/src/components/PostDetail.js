import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';

import { PageHeader, Panel, Label, Button } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import Post from './Post';


class PostDetail extends Component {
    componentWillMount() {
	/* call action creator */
	/* action creator will grab the post with this id from the API   */
	/* and send it to the reducer */
	/* reducer will add it to the state */
	this.props.fetchPost(this.props.params.slug);
    }

    static contextTypes = {
	router: PropTypes.object
    };

    render() {
	const { post } = this.props;
	if (!post) {
	    return (
		<div></div>
	    );
	}

	return (
	    <div>
		<br/>
		<LinkContainer to={{ pathname: "/post/"+this.props.params.slug+"/edit"}}>
		    <Button className="right">
			Edit Post
		    </Button>
		</LinkContainer>
		
		<Post title={post.title}
		      body={post.body}
		      tags={post.tags}/>
	    </div>	    
	);
    }
}

function mapStateToProps(state) {
    return { post:state.posts.post };
}

export default connect(mapStateToProps, { fetchPost })(PostDetail);
