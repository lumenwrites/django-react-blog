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
		    <LinkContainer to={{ pathname: '/post/new'}}>
			<NavItem eventKey={2}>New Post</NavItem>
		    </LinkContainer>,
		    
		    <LinkContainer to={{ pathname: '/signout'}}>
			<NavItem eventKey={3}>Sign Out</NavItem>
		    </LinkContainer>
		]
	    );
	    
	} else {
	    console.log("Rendering header links. User is not authenticated, so showing Sign in and Sign up links.");
	    return (
		[
		]
	    );

	    /*
	       <LinkContainer to={{ pathname: '/signin'}}>
	       <NavItem eventKey={2}>Sign in</NavItem>
	       </LinkContainer>
	       
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
	    <div>
		<Navbar>
		    <Navbar.Header>
			<Navbar.Brand>
			    <Link to="/">
				My Blog
			    </Link>
			</Navbar.Brand>
		    </Navbar.Header>

		    <Navbar.Collapse>		    
			<Nav className="right">
			    <IndexLinkContainer to={{ pathname: '/'}}>
				<NavItem eventKey={1}>Post List</NavItem>
			    </IndexLinkContainer>
			    
			    { this.renderLinks() }
			    
			    <LinkContainer to={{ pathname: '/about'}}>
				<NavItem eventKey={10}>About</NavItem>
			    </LinkContainer>
			    
			</Nav>
		    </Navbar.Collapse>
		</Navbar>
		

	    </div>
	);
    }
}


function mapStateToProps(state) {
    return {
	authenticated: state.auth.authenticated
    };
}
export default connect(mapStateToProps)(Header);
