import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/app';

import PostList from './components/post_list';
import PostNew from './components/post_new';
import PostEdit from './components/post_edit';
import PostDetail from './components/post_detail';

import About from './components/about';

import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import RequireAuth from './components/auth/require_auth';


export default (
    <Route path="/" component={App}>
	<IndexRoute component={PostList} />
	<Route path="post/new" component={RequireAuth(PostNew)} />
	<Route path="post/:slug" component={PostDetail} />
	<Route path="post/:slug/edit" component={PostEdit} />        			
	<Route path="about" component={About} />
	<Route path="signin" component={Signin} />
	<Route path="signout" component={Signout} />        		
    </Route>
)
