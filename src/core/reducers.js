import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { homeReducer } from './auth';
import { notificationReducer } from './notification';
import { tasksReducer } from './tasks';
import { postsReducer } from './posts';
import { modalReducer } from './modal';
import { uploaderReducer } from './uploader';
import { reducer as reduxFormReducer } from 'redux-form';


export default combineReducers({
  home: homeReducer,
  notification: notificationReducer,
  routing: routerReducer,
  tasks: tasksReducer,
  posts: postsReducer,
  form: reduxFormReducer,
  modal: modalReducer,
  uploader: uploaderReducer
});
