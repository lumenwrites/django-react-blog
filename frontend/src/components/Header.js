import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Button, Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
    renderLinks(){
	if(this.props.authenticated) {
	    console.log("Rendering header links. User is authenticated, so showing New Post and Sign Out links.");
	    return (
		[
		    <Link key={1} to={{ pathname: '/post/new'}}>
			New Post
		    </Link>,
		    
		    <Link key={2} to={{ pathname: '/signout'}}>
			Sign Out
		    </Link>
		]
	    );
	    
	} else {
	    console.log("Rendering header links. User is not authenticated, so showing Sign in and Sign up links.");
	    return (
		[
		    <Link to={{ pathname: '/subscribe'}}>
			Subscribe
		    </Link>
		]
	    );

	    /*
	       <LinkContainer to={{ pathname: '/signup'}}>
	       <NavItem eventKey={3}>Sign Up</NavItem>
	       </LinkContainer>
	     */	    
	}
	
    }
    
    render() {
	console.log(">>>> src/components/header.js:");	
	console.log("Rendering header. Authenticated: " + this.props.authenticated);
	return (
	    <header>
		<div className="container">
		    <div className="row">      
			<div className="col-xs-9 search">
			    <a className="logo">
				digitalmind
			    </a>
			</div>
			<div className="col-xs-3 main-menu">
			    <div className="right">
				{ this.renderLinks() }
			    </div>
			</div>
		    </div>
		</div>
	    </header>
	);
    }
}


function mapStateToProps(state) {
    return {
	authenticated: state.auth.authenticated
    };
}
export default connect(mapStateToProps)(Header);
