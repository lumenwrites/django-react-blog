import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSettings } from '../actions/index';
import { Link } from 'react-router';

class Pagination extends Component {
    renderPrev () {
	const currentPage = parseInt(this.props.location.query.page ?
				     this.props.location.query.page : 1);
	const prevPage =  currentPage - 1;
	
	if (this.props.prev) {
	    return (
		<Link to={""}
		      query={Object.assign({}, this.props.location.query, {page:prevPage})}>
		    <i className="fa fa-chevron-left left"></i>    
		</Link>
	    )
	}
    }

    renderNext () {
	const currentPage = parseInt(this.props.location.query.page ?
				     this.props.location.query.page : 1);
	const nextPage = currentPage + 1;
	if (this.props.next) {
	    return (
		<Link to={""}
		      query={Object.assign({}, this.props.location.query, {page:nextPage})}>
		    <i className="fa fa-chevron-right right"></i>    
		</Link>
	    )
	}
    }
    render() {
	const currentPage = parseInt(this.props.location.query.page ?
				     this.props.location.query.page : 1);
	const paginated = (this.props.prev || this.props.next)? true : false;
	if (!paginated) { return null; }

	return (
	    <div className="pagination panel">
		<span className="step-links">
		    { this.renderPrev () }
		    <span className="current">
			Page {currentPage}
		    </span>
		    { this.renderNext () }		    
		</span>
	    </div>
	);
    }
}


function mapStateToProps(state) {
    return { settings: state.settings.all };
}

export default connect(mapStateToProps, { fetchSettings })(Pagination);
