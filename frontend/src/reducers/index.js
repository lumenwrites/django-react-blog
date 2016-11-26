import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';


import PostReducer from './reducer_posts';
import authReducer from './reducer_auth';

const rootReducer = combineReducers({
    form: formReducer,
    posts: PostReducer,
    auth: authReducer
});

export default rootReducer;
