import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { postsReducer } from './posts';
import { modalReducer } from './modal';
import { uploaderReducer } from './uploader';
import { reducer as reduxFormReducer } from 'redux-form';


export default combineReducers({
  auth: authReducer,
  routing: routerReducer,
  posts: postsReducer,
  form: reduxFormReducer,
  modal: modalReducer,
  uploader: uploaderReducer
});
