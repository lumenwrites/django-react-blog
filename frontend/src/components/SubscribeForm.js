import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import FontAwesome from 'react-fontawesome';
import { FormGroup, FieldGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import { createSubscriber } from '../actions/index';

class SubscribeForm extends Component {
    constructor(props) {
	super(props);
	this.onSubmit = this.onSubmit.bind(this);
    }    
    onSubmit(event) {
	event.preventDefault();
	console.log('Email: ' + ReactDOM.findDOMNode(this.refs.email).value);
	const email = {email: ReactDOM.findDOMNode(this.refs.email).value};
	this.props.createSubscriber(email);

    }
    render() {
	return (
	    <form className="subscription-form" onSubmit={this.onSubmit}>
		<FormControl className="email"
			     type="email"
			     placeholder="email"
			     ref="email" />
		<Button bsStyle="primary" className="subscribe"
			type="submit">Subscribe</Button>
		<Button bsStyle="primary" className="rss" type="submit">
		    <FontAwesome name='rss' />
		</Button>
		<div className="clearfix"></div>
	    </form>
	);
    }
}


function mapStateToProps(state) {
    return { settings: state.settings.all };
}

export default connect(mapStateToProps, {createSubscriber})(SubscribeForm);
