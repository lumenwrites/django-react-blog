import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Main from './components/Main';

import PostList from './components/PostList';
import PostNew from './components/PostNew';
import PostEdit from './components/PostEdit';
import PostDetail from './components/PostDetail';

import About from './components/About';

import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import RequireAuth from './components/auth/require_auth';


export default (
    <Route path="/" component={Main}>
	<IndexRoute component={PostList} />
	<Route path="post/new" component={RequireAuth(PostEdit)} />
	<Route path="post/:slug" component={PostDetail} />
	<Route path="category/:category" component={PostList} />
	<Route path="tag/:tag" component={PostList} />		
	<Route path="post/:slug/edit" component={RequireAuth(PostEdit)} />
	<Route path="about" component={About} />
	<Route path="login" component={Signin} />
	<Route path="logout" component={Signout} />        		
    </Route>
)
