import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSettings } from '../actions/index';

import MetaTags from 'react-meta-tags';
import removeMd from 'remove-markdown';

import Post from './Post';


class About extends Component {
    componentWillMount() {
	this.props.fetchSettings();	
    }

    renderMetaInfo () {
	const settings =  this.props.settings;
	const post = this.props.post;

	if (!settings) { return null; }
	/* Remove markdown from post body, and truncate it to 160 chars. */

	var body = ""
	if (settings.about) {
	    body = removeMd(settings.about);
	}
	const truncate_length = 160;
	const description = body.substring(0, truncate_length - 3) + "...";

	if (!settings.title) { return null; }
	return (
            <MetaTags>
		<title>{"About " + settings.title}</title>
		<meta name="author" content={settings.author} />  
		<meta name="description"
		      content={description} />
		<meta name="keywords"
		      content={settings.keywords} />		
            </MetaTags>
	);
    }

    
    render() {
	var about =  this.props.settings.about;

	if (!about) {return (<div></div>);}
	if (about == "") {
	    about = "To edit this text, go to /admin, create settings object, and fill in the info."
	}
	
	return (
	    <div>
		{ this.renderMetaInfo() }
		<Post title="About" published={true} body={about}/>
	    </div>	    
	);
    }
}


function mapStateToProps(state) {
    return { settings: state.settings.all };
}

export default connect(mapStateToProps, { fetchSettings })(About);
