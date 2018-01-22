import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { notificationReducer } from './notification';
import { tasksReducer } from './tasks';
import { postsReducer } from './posts';
import { modalReducer } from './modal';
import { reducer as reduxFormReducer } from 'redux-form';


export default combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  routing: routerReducer,
  tasks: tasksReducer,
  posts: postsReducer,
  form: reduxFormReducer,
  modal: modalReducer,
});
