import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

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
		       tags: "",
		       category: ""};

	/* So that I would be able to access this component with "this"
	   inside the functions: */
	this.onTitleChange = this.onTitleChange.bind(this);
	this.onBodyChange = this.onBodyChange.bind(this);	
	this.onTagsChange = this.onTagsChange.bind(this);
	this.onCategoryChange = this.onCategoryChange.bind(this);	

    }
    
    componentWillMount() {
	/* call action creator */
	/* action creator will fetch the post from the API   */
	/* and send it to the reducer */
	/* reducer will add it to the redux state */
	/* Which will be rendered into the form */
	this.props.fetchPost(this.props.params.slug);
	this.props.fetchCategories;	
    }


    componentWillReceiveProps(nextProps) {
	/* Once the post has been fetched, add it to the state.
	   I can't do this in componentWillMount() because I gotta wait for
	   fetchPost() to complete, and I can't use the promise,
	   because action creator has to return the action object, not a promise.*/
	const { post } =  nextProps;
	/* console.log("Received props! Body: " + post.body);*/
	this.setState({
	    body: post.body,
	    title: post.title,
	    tags: post.tags	    
	});
    }

    /* Every time I type into the form - update the state. */
    /* There's probably a smarter way to do this. */
    onTitleChange(event) {
	this.setState({ title: event.target.value });
    };
    onBodyChange(value) {
	this.setState({ body: value });
    };
    onTagsChange(event) {
	this.setState({ tags: event.target.value });
    };
    onCategoryChange(event) {
	const selectedCategory = ReactDOM.findDOMNode(this.select).value;
	console.log("Selected category: " + selectedCategory);
	this.setState({ category: selectedCategory });	
    };

    onSubmit(event) {
	/* Handle submit */
	/* Stop the default event(so that submitting form wouldn't reload thep page) */
	event.preventDefault();
	/* Grabbing all the form data from the state */
	const { body, title, tags, category } = this.state;

	/* Creating a post object */
	const post = { title, body, tags, category }
	/* console.log("Sending post to API. Slug: " + this.props.params.slug);*/
	/* Calling an action creator, sending the post to the api */
	this.props.updatePost(this.props.params.slug, post);
    }

    onDelete() {
	/* Calling an action creator that deletes the post */
	this.props.deletePost(this.props.params.slug);
    }
    

    renderCategories(){
	const categories = this.props.categories.results;

	if (!categories || categories.length == 0) { return null; };

	const categories_list = categories.map((category) => {
	    return (
		<option key={category.slug} value={category.slug}>
			{category.title}
		</option>
	    );
	});

	return (
	    <FormControl ref={select => { this.select = select }}
	                 onChange={this.onCategoryChange}
	                 value={this.state.category}
	                 componentClass="select"
	                 className="select-categories">
		<option value="">Category</option>
		{ categories_list }
	    </FormControl>
	);
    }

    
    render() {
	/* Grabbing the post from the redux state
	   (connected to this component at the end of this file) */
	const { post, categories } = this.props;
	const noCategories = (!categories || categories.length == 0)

	/* 
	console.log("> Current state: ");
	console.log("Title: " + this.state.title);		
	console.log("Body: " + this.state.body);
	console.log("Tags: " + this.state.tags);	
	*/

	/* Rendering an empty div before I've fetched the post data */
	if (!post) { return ( <div></div> ); }
	
	return (
	    <div>
		<br/>
		<form onSubmit={this.onSubmit.bind(this)}>
		    <FormGroup>
			{/* Title */}						
			<FormControl className="postTitle"
				     type="text"
				     placeholder="Post Title"
				     value={this.state.title}
				     onChange={this.onTitleChange}/>

			{/* Body */}			
			<SimpleMDE
			    onChange={this.onBodyChange}
			    value={this.state.body}		    
			    options={{
				spellChecker: false,
				placeh0older: "Write here...",
				initialValue: this.state.body,
			    }}/>

			{/* Categories */}
			{ this.renderCategories() }
			{/* Tags.
			    If there are no categories - I'm not rendering
			    the categories selector, so I need to make the
			    width 100%. */}			
			<FormControl className={"post-tags" +
						 (noCategories ? "force-fullwidth" : "")}
				     type="text"
				     placeholder="tag1, tag2, tag3"
				     value={this.state.tags}
				     onChange={this.onTagsChange}/>
			<div className="clearfix"></div>
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
	post:state.posts.post,
	categories: state.categories.all
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
