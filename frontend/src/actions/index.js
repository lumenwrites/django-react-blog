import axios from 'axios';
import { browserHistory } from 'react-router';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

const host = window.location.host.split(':')[0];
export const ROOT_URL = 'http://' + host + ':8000/api/v1';

export function fetchPosts() {
    /* console.log("Fetching posts"); */
    return function(dispatch) {    
	axios.get(`${ROOT_URL}/posts/`)
	     .then(response => {
		 /* console.log(">>>> src/actions/index.js (promise):");*/
		 /* console.log("Successfully fetched posts.Dispatching action FETCH_POSTS");*/

		 dispatch({
		     type: FETCH_POSTS,
		     payload: response
		 });
	     });
    };
}

export function fetchPost(slug) {
    /* console.log(">>>> src/actions/index.js:");
     * console.log("Fetching post.");	    */
    
    return function(dispatch) {    
	axios.get(`${ROOT_URL}/post/${slug}/`)
	     .then(response => {
		 /* console.log("Successfully fetched post.");
		    console.log(response.data.body);*/
		 
		 dispatch({
		     type: FETCH_POST,
		     payload: response
		 });
	     });
    };
}


export function createPost(props) {
    // Get the saved token from local storage
    const config = {
	headers:  { authorization: 'Token ' + localStorage.getItem('token')}
    };

    return function(dispatch) {
	axios.post(`${ROOT_URL}/post/new`, props, config)
	     .then(response => {
		 browserHistory.push('/');
		 /* console.log(response);*/
		 dispatch({
		     type: CREATE_POST,
		     payload: response
		 });
	     });
    }
}


export function updatePost(slug, post) {
    // Get the saved token from local storage
    /* console.log(">>>> src/actions/index.js:");
     * console.log("Getting a token from localStorage. ");	    */
    
    const config = {
	headers:  { authorization: 'Token ' + localStorage.getItem('token')}
    };

    console.log("Post Tags: " + post.tags);

    return function(dispatch) {
	axios.put(`${ROOT_URL}/post/${slug}/`, post, config)
	     .then(response => {
		 console.log(">>>> src/actions/index.js (promise):");
		 console.log("Created a post. Redirecting to /.");
		 browserHistory.push('/post/' + response.data.slug);
		 /* console.log(response);*/
		 dispatch({
		     type: UPDATE_POST,
		     payload: response
		 });
	     });
    }
}

export function deletePost(slug) {
    /* console.log(">>>> src/actions/index.js:");
     * console.log("Deleting post.");	    */

    const config = {
	headers:  { authorization: 'Token ' + localStorage.getItem('token')}
    };
    
    return function(dispatch) {    
	axios.delete(`${ROOT_URL}/post/${slug}/`, config)
	     .then(response => {
		 console.log(">>>> src/actions/index.js (promise):");
		 console.log("Successfully deleted post. Dispatching action DELETE_POST.");
		 browserHistory.push('/');		 
		 dispatch({
		     type: DELETE_POST,
		     payload: response
		 });
	     });
    };
    
}



export function fetchCategories() {
    return function(dispatch) {    
	axios.get(`${ROOT_URL}/categories/`)
	     .then(response => {
		 console.log("Categories fetched: " + response);
		 dispatch({
		     type: FETCH_CATEGORIES,
		     payload: response
		 });
	     });
    };
}
