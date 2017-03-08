/* IMPORTANT:
   Now I am using the PostEdit component for both creating and editing posts.
   I am keeping this component as an example of validating the form.
 */
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';

import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import SimpleMDE from 'react-simplemde-editor';
/* 
<FormControl componentClass="textarea"
placeholder="Write here..."
{...body} />
*/


class PostNew extends Component {
    /* Access properties from context */
    /* Router creates context, and this thing takes it */
    static contextTypes = {
	router: PropTypes.object
    };

    constructor(props) {
	super(props);
	this.state = {
	    textValue: ""
	};	
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


	/* createPost returns a promise */
	this.props.createPost(post);
    }

    render() {
	/* same as
	   const title = this.props.fields.title; */
	const { fields: {title, body, tags}, handleSubmit } = this.props;

	return (
	    <div>
		<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
		    <FormGroup>
			<ControlLabel>
			    { title.touched ? title.error : '' }
			</ControlLabel>
			<FormControl className="postTitle"
				     type="text"
				     placeholder="Post Title"
				     {...title} />

			<SimpleMDE
			    onChange={this.onTextChange.bind(this)}		    
			    options={{
				spellChecker: false,
				placeholder: "Write here...",
				initialValue: this.state.textValue,
			    }}/>

			<FormControl className="postTags"
				     type="text"
				     placeholder="tag1, tag2, tag3"
				     {...tags}/>
			<br/>

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

export default reduxForm({
    form: 'PostNewForm',
    fields: ['title','body','tags'],
    validate
}, null, { createPost })(PostNew);
