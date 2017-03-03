import React, { Component, PropTypes } from 'react';

// bootstrap theme
import { EmailSignInForm } from "redux-auth/bootstrap-theme";


export default class LoginForm extends Component {
    // render
    render() {
	return <EmailSignInForm endpoint="http://localhost:8000/api/v1/token-auth/"
	       />;
    }
}
