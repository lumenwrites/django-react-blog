import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchCategories } from '../actions/index';

import { Button, Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import LogoImage from '../../img/digitalmind-logo.png'

class Header extends Component {
    componentWillMount() {
	/* call action creator */
	/* action creator will grab the post with this id from the API   */
	/* and send it to the reducer */
	/* reducer will add it to the state */
	this.props.fetchCategories();
    }


    renderCategories(){
	const categories = this.props.categories.results;
	console.log("Rendering categories: " + categories);

	if (!categories) { return (<div></div>); };

	return categories.map((category) => {
	    console.log("Looping over categories. Category: " + category);
	    return (
		<li key={category.slug}>
		    <Link to={'/category/' + category.slug}>
		    {category.title}
		    </Link>
		</li>
	    )
	});
    }

    renderLinks(){
	/* console.log("Rendering header links.");*/
	if(this.props.authenticated) {
	    return (
		[
		    <Link key={1} to={{ pathname: '/post/new'}} className="main-menu">
			New post
		    </Link>,
		    
		    <Link key={2} to={{ pathname: '/signout'}}>
			Sign out
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
		<div className="container">
		    <div className="row">      
			<div className="col-xs-4 col-sm-6 search">
			    <Link className="logo" to={'/'}>
				digital<span className="bold">mind</span>
				<img src={LogoImage}/> 				
			    </Link>
			</div>
			<div className="col-xs-8 col-sm-6 main-menu">
			    <div className="right">
				<div className="dropdown hidden">
				    <Link to={'/'}>
					Browse
				    </Link>
				    <ul className="dropdown-menu">
					<li><Link to={'/'}>All</Link></li>
					{ this.renderCategories() }
				    </ul>	
				</div>
				

				<div className="dropdown hidden">
				    <Link to={'/'}>
					Browse
				    </Link>
				    <ul className="dropdown-menu">
					<li><a href="all">All</a></li>
				    </ul>	
				</div>
				{ this.renderLinks() }
				<Link to={'/about/'}>
				    About
				</Link>
				
			    </div>
			</div>
		    </div>
		</div>
	    </header>
	);
    }
}


function mapStateToProps(state) {
    console.log("mapStateToProps categories" + state.categories.results);
    return {
	authenticated: state.auth.authenticated,
	categories: state.categories.all
    };
}
export default connect(mapStateToProps, { fetchCategories })(Header);
