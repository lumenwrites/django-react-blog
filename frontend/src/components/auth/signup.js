import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
    handleFormSubmit({email, password}) {
	/* console.log(email, password);*/
	// signupUser comes from actions.
	// it is an action creator that sends an email/pass to the server
	// and if they're correct, saves the token
	this.props.signupUser({email,password});
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
	const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;
	/* console.log(...email);*/
	console.log(this.props.fields);

	return (
	    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
		<fieldset className="form-group">
		    <label>Email:</label>
		    <input {...email} className="form-control" />
		    {email.touched && email.error && <div classNamer="error">{email.error}</div>}		  
		</fieldset>
		<fieldset className="form-group">
		    <label>Password:</label>
		    <input {...password} type="password" className="form-control" />
		    {password.touched && password.error && <div classNamer="error">{password.error}</div>}
		</fieldset>
		<fieldset className="form-group">
		    <label>Repeat Password:</label>
		    <input {...passwordConfirm} type="password" className="form-control" />
		    {passwordConfirm.touched && passwordConfirm.error && <div classNamer="error">{passwordConfirm.error}</div>}		  		    
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


function validate(formProps) {
    const errors = {};

    if (!formProps.email) {
	errors.email = "Enter an email";	
    }

    if (!formProps.password) {
	errors.password = "Enter a password";	
    }

    if (!formProps.passwordConfirm) {
	errors.passwordConfirm = "Enter a password confirmation";	
    }
    
    if (formProps.password != formProps.passwordConfirm) {
	errors.password = "Passwords don't match";
    }
    /* console.log(errors);*/
    return errors;
}



export default reduxForm({
    form: 'signup',
    fields: ['email','password', 'passwordConfirm'],
    validate: validate
}, mapStateToProps, actions)(Signup);
