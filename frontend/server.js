/* This file will be used for server-side rendering */
/* It doesn't do anything so far, right now all files are served with nginx. */
import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import counterServer from './reducers'
import Server from './containers/Server'

const server = new Express()
const port = process.env.PORT || 3000

// This is fired every time the server side receives a request
server.use(handleRender)


function handleRender(req, res) { /* ... */ }
function renderFullPage(html, preloadedState) { /* ... */ }

server.listen(port, function(){
    console.log("Server running on port " + port);
})
