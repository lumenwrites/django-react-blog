import React, { Component } from 'react';

/* Bootstrap */
import { Grid, Row, Col } from 'react-bootstrap';

/* Styles */
import '../styles/bootstrap.min.css';
import '../styles/style.scss';

/* My Components */
import Header from './Header';
import Footer from './Footer';

export default class App extends Component {
    render() {
	/* For child routers */
	const { children } = this.props;
	return (
	    <div className="mainWrapper">
		<Header />
		<div className="page">
		    <Grid>
			<Row className="show-grid">
			    <Col xs={12} md={12}>
				{ children }
			    </Col>
			</Row>
		    </Grid>
		</div>
		<Footer />		
	    </div>
	);
    }
}
