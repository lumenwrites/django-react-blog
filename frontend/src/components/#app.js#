import React, { Component } from 'react';

/* Bootstrap */
import { Grid, Row, Col } from 'react-bootstrap';

/* My Components */
import Header from './header';
import MainSection from './main_section';
import Footer from './footer';

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
