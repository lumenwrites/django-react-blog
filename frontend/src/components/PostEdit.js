import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';

import { PageHeader, FormGroup, FieldGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import SimpleMDE from 'react-simplemde-editor';


class PostEdit extends Component {
    /* Access properties from context */
    /* Router creates context, and this thing takes it */
    static contextTypes = {
	router: PropTypes.object
    };

    constructor(props){
	super(props);
	/* Set empty state to avoid errors before post is fetched */
	this.state = { title: "",
		       body:"",
		       tags: ""};

	this.onTitleChange = this.onTitleChange.bind(this);
	this.onBodyChange = this.onBodyChange.bind(this);	
	this.onTagsChange = this.onTagsChange.bind(this);

    }
    
    componentWillMount() {
	/* call action creator */
	/* action creator will fetch the post from the API   */
	/* and send it to the reducer */
	/* reducer will add it to the redux state */
	this.props.fetchPost(this.props.params.slug);
    }


    componentWillReceiveProps(nextProps) {
	const { post } =  nextProps;
	console.log("Received props! Body: " + post.body);
	/* Once the post has been fetched, add it to the state */
	this.setState({
	    body: post.body,
	    title: post.title,
	    tags: post.tags	    
	});
    }
    
    
    onTitleChange(event) {
	this.setState({
	    title: event.target.value
	});
    };
    onBodyChange(value) {
	this.setState({
	    body: value
	});
    };

    onTagsChange(event) {
	this.setState({
	    tags: event.target.value
	});
    };

    onSubmit(event) {
	const { body, title, tags } = this.state; /* props;*/
	/* const body = this.state.body;*/
	event.preventDefault();

	const post = {
	    title: title,
	    body: body,
	    tags: tags
	}

	console.log("Sending post to API. Slug: " + this.props.params.slug);
	/* editPost returns a promise */
	this.props.updatePost(this.props.params.slug, post).then(() => {
		/* When promise is resolved, it means post is successfully created */
	    /* This will be called when the promise is resolved */
	    browserHistory.push('/post/' + response.data.slug);
	    });

    }

    onDelete() {
	this.props.deletePost(this.props.params.slug)
	    .then(() => {
		this.context.router.push('/');
	    });
    }
    
    
    render() {
	const { post } = this.props;

	console.log("Current state");
	console.log("Title: " + this.state.title);		
	console.log("Body: " + this.state.body);
	console.log("Tags: " + this.state.tags);	


	if (!post) {
	    return (
		<div></div>
	    );
	}
	
	return (
	    <div>
		<br/>
		<form onSubmit={this.onSubmit.bind(this)}>
		    <FormGroup>
			<FormControl className="postTitle"
				     type="text"
				     placeholder="Post Title"
				     value={this.state.title}
				     onChange={this.onTitleChange}/>

			<SimpleMDE
			    onChange={this.onBodyChange}
			    value={this.state.body}		    
			    options={{
				spellChecker: false,
				placeh0older: "Write here...",
				initialValue: this.state.body,
			    }}/>

			<FormControl className="postTags"
				     type="text"
				     placeholder="tag1, tag2, tag3"
				     value={this.state.tags}
				     onChange={this.onTagsChange}/>
			<br/>

			<Button onClick={this.onDelete.bind(this)}>
			    Delete Post
			</Button>
			
			<div className="right">
			    <IndexLinkContainer to={{ pathname: '/'}}>
				<Button type="submit">Cancel</Button>
			    </IndexLinkContainer> &nbsp;
			    <Button bsStyle="primary" type="submit">Save</Button>
			</div>
		    </FormGroup>
		    <br/><br/>
		</form>
	    </div>
	);
    }
}




function mapStateToProps(state) {
    return {
	post:state.posts.post
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
