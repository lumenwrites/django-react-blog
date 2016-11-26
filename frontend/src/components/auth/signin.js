import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/auth';

class Signin extends Component {
    handleFormSubmit({username, password}) {
	/* console.log(username, password);*/
	// log user in
	// signinUser comes from actions.
	// it is an action creator that sends an username/pass to the server
	// and if they're correct, saves the token
	this.props.signinUser({username,password});
    }

    renderAlert(){
	if (this.props.errorMessage) {
	    return (
		<div className="alert alert-danger">
		    {this.props.errorMessage}
		</div>
	    );
	}
    }
    render () {
	/* props from reduxForm */
	const { handleSubmit, fields: { username, password }} = this.props;
	/* console.log(...username);*/
	return (
	    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
		<fieldset className="form-group">
		    <label>Username:</label>
		    <input {...username} className="form-control" />
		</fieldset>
		<fieldset className="form-group">
		    <label>Password:</label>
		    <input {...password} type="password" className="form-control" />
		</fieldset>
		{this.renderAlert()}
		<button action="submit" className="btn btn-primary">Sign in</button>
	    </form>
	);
    }
}

function mapStateToProps(state) {
    return { errorMessage:state.auth.error };
}

export default reduxForm({
    form: 'signin',
    fields: ['username','password'] 
}, mapStateToProps, actions)(Signin);
