import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';


import PostReducer from './reducer_posts';
import CategoriesReducer from './reducer_categories';
import SettingsReducer from './reducer_settings';
import ProfilesReducer from './reducer_profiles';
import authReducer from './reducer_auth';

const rootReducer = combineReducers({
    form: formReducer,
    posts: PostReducer,
    categories: CategoriesReducer,
    settings: SettingsReducer,
    profiles: ProfilesReducer,
    auth: authReducer
});

export default rootReducer;
