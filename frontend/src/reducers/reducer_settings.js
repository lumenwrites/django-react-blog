

export default function(state={all: []}, action) {
    switch(action.type) {
	case 'FETCH_SETTINGS':
	    /* Action returns a list of posts */
	    /* And this adds them to the state */
	    /* (creating a new state object out of old state and fetchet settings) */
	    /* console.log("Settings added to state: " + action.payload.data);*/
	    return {...state, all: action.payload.data };
	default:
	    return state;
    }
}
