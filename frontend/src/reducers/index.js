import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';


import PostReducer from './reducer_posts';
import CategoriesReducer from './reducer_categories';
import authReducer from './reducer_auth';

const rootReducer = combineReducers({
    form: formReducer,
    posts: PostReducer,
    categories: CategoriesReducer,
    auth: authReducer
});

export default rootReducer;
