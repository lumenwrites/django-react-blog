import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { updatePost, fetchPost, deletePost } from '../actions/index';

import { PageHeader, FormGroup, FieldGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import SimpleMDE from 'react-simplemde-editor';
/* 
<FormControl componentClass="textarea"
placeholder="Write here..."
{...body} />
*/


class PostEdit extends Component {
    /* Access properties from context */
    /* Router creates context, and this thing takes it */
    static contextTypes = {
	router: PropTypes.object
    };

    
    componentWillMount() {
	/* call action creator */
	/* action creator will grab the post with this id from the API   */
	/* and send it to the reducer */
	/* reducer will add it to the state */
	this.props.fetchPost(this.props.params.slug);

	/* 
	    .then(() => {
		console.log("Fetching post!");
		this.setState({
		    textValue: post.body
		});
	    });
	*/		
    }

    

    constructor(props) {
	super(props);
	this.state = {
	    textValue: "Initial"
	};


	if (this.props.post) {
	    /* 
	    this.setState({
		textValue: this.props.post.body
	    });
	    */
	}
	
	
    };
    
    onTextChange(value) {
	this.setState({
	    textValue: value
	});
    };
    

    onSubmit(props) {
	const {title, tags } = props;
	const body = this.state.textValue;

	const post = {
	    title: title,
	    body: body,
	    tags: tags
	}


	/* editPost returns a promise */
	this.props.updatePost(this.props.params.slug, post)
	    .then(() => {
		/* When promise is resolved, it means post is successfully created */
		/* This will be called when the promise is resolved */

	    });

    }

    onDelete() {
	this.props.deletePost(this.props.params.slug)
	    .then(() => {
		this.context.router.push('/');
	    });
    }
    
    
    render() {
	
	/* same as
	   const title = this.props.fields.title; */
	const { fields: {title, body, tags}, handleSubmit } = this.props;
	const { post } = this.props;

	if (!post) {
	    return (
		<div></div>
	    );
	}
	
	return (
	    <div>
		<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
		    <FormGroup>
			<br/>

			<ControlLabel>
			    { title.touched ? title.error : '' }
			</ControlLabel>
			<FormControl className="postTitle"
				     type="text"
				     placeholder="Post Title"
				     value={post.title}
				     {...title} />

			<SimpleMDE
			    onChange={this.onTextChange.bind(this)}		    
			    options={{
				spellChecker: false,
				placeholder: "Write here...",
				initialValue: post.body,
			    }}/>

			<FormControl className="postTags"
				     type="text"
				     placeholder="tag1, tag2, tag3"
				     {...tags}/>
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

function validate(values) {
    const errors = {};

    if (!values.title) {
	errors.title = 'Enter post title';
    }

    /* if error object has a key that matches one of the field names  */
    /* it will throw the error */
    return errors;
}


function mapStateToProps(state) {
    return { post:state.posts.post };
}


export default reduxForm({
    form: 'PostEditForm',
    fields: ['title','body','tags'],
    validate
}, mapStateToProps, { updatePost, fetchPost, deletePost })(PostEdit);
