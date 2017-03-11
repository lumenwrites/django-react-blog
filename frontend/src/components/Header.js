import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { fetchCategories, fetchSettings } from '../actions/index';
import { subscribedClose } from '../actions/index';

import { Button, Navbar, Nav, NavItem, Modal } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import LogoImage from '../../img/digitalmind-logo.png'
import SubscribeForm from './SubscribeForm';

class Header extends Component {
    componentWillMount() {
	/* call action creator */
	/* action creator will grab the post with this id from the API   */
	/* and send it to the reducer */
	/* reducer will add it to the state */
	this.props.fetchCategories();
	/* this.props.fetchSettings();	*/
    }

    componentDidUpdate() {
	if (this.props.subscribed) {
	    /* After the user submits email, I set subscribed state to true.
	       If it is true - wait for 2 seconds(displaying success alert),
	       then send out the action flipping subscribed back to false. */
	    const close = this.props.subscribedClose;
	    setTimeout(function(){
		close();
	    }, 2000);
	}
    }

    renderSubscribedConfirmation () {
	/* Display success alert while subscribed state is set to true. */
	if (this.props.subscribed) {
	    return (
		<div className="alert alert-success">
		    <strong>Success!</strong> Thank you for subscribing!
		</div>
	    );
	}
    }
    renderCategories(){
	const categories = this.props.categories.results;
	/* console.log("Rendering categories: " + categories);*/

	if (!categories || categories.length == 0) { return null; };

	const categories_list = categories.map((category) => {
	    /* console.log("Looping over categories. Category: " + category);*/
	    return (
		<li key={category.slug}>
		    <Link to={'/category/' + category.slug}>
		    {category.title}
		    </Link>
		</li>
	    );
	});

	return (
	    <span className="dropdown">
		<Link to={'/'}>
		    Browse
		</Link>
		<ul className="dropdown-menu">
		    <li><Link to={'/'}>All</Link></li>
		    { categories_list }
		</ul>	
	    </span>				
	);
    }

    renderLinks(){
	/* console.log("Rendering header links.");*/
	if(this.props.authenticated) {
	    return (
		[
		    <Link key={1} to={{ pathname: '/post/new'}}>
			Write 
		    </Link>,
		    
		    <Link key={2} to={{ pathname: '/logout'}}>
			Logout
		    </Link>
		]
	    );
	    
	} else {
	    return (
		[
		]
	    );
	    /*
	       <Link to={{ pathname: '/subscribe'}}>
	       Subscribe
	       </Link>
	     */

	    /*
	       <LinkContainer to={{ pathname: '/signup'}}>
	       <NavItem eventKey={3}>Sign Up</NavItem>
	       </LinkContainer>
	     */	    
	}
	
    }

    
    render() {
	return (
	    <header>
		{ this.renderSubscribedConfirmation () }
		<div className="container">
		    <div className="row">      
			<div className="col-xs-12 col-sm-6 search">
			    <Link className="logo" to={'/'}>
				digital<span className="bold">mind</span>
				<img src={LogoImage}/> 				
			    </Link>
			</div>
			<div className="col-xs-12 col-sm-6 main-menu">
			    <div className="menu">
				{ this.renderLinks() }
				{ this.renderCategories() }
				{ /*
				<Link to={'/about/'}>
				    Subscribe
				</Link>
				*/ }
				<Link to={'/about/'}>
				    About
				</Link>
				
			    </div>
			</div>
		    </div>
		</div>
		<Modal>
		    Modal
		</Modal>
	    </header>
	);
    }
}


function mapStateToProps(state) {
    return {
	authenticated: state.auth.authenticated,
	categories: state.categories.all,
	settings: state.settings.all,
	subscribed: state.profiles.subscribed
    };
}
export default connect(mapStateToProps, { fetchCategories, fetchSettings, subscribedClose })(Header);
