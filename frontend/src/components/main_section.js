import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

export default class Header extends Component {
    render() {
	return (
	    <div className="page">
		{ this.props.children }
	    </div>
	);
    }
}

