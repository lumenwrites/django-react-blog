/* This file will be used for server-side rendering */
/* It doesn't do anything so far, right now all files are served with nginx. */
import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
/* import counterServer from './reducers'*/
/* import Server from './containers/Server'*/

const server = new Express()
const port = process.env.PORT || 3000

function handleRender(req, res) {
    // Create a new Redux store instance
    const store = createStore(counterApp)

    // Render the component to a string
    const html = renderToString(
	<Provider store={store}>
	    <App />
	</Provider>
    )

    // Grab the initial state from our Redux store
    const preloadedState = store.getState()

    // Send the rendered page back to the client
    res.send(renderFullPage(html, preloadedState))
}


// This is fired every time the server side receives a request
server.use(handleRender)


function handleRender(req, res) { /* ... */ }
function renderFullPage(html, preloadedState) { /* ... */ }

server.listen(port, function(){
    console.log("Server running on port " + port);
})
