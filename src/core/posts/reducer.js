import { combineReducers } from 'redux';

import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_POST_SUCCESS,
  EDIT_POST_START,
  EDIT_POST_END,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_REQUEST,
  UPDATE_POST_SUCCESS,
  REQUEST_POSTS,
  SUBMIT_FORM
} from './action-types';

const postsById = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      let nextState = { ...state };
      action.payload.forEach(post => {
        nextState[post.id] = post;
      });
      return nextState;

    case UPDATE_POST_SUCCESS:
      return {
        ...state, [action.payload.id]: action.payload // `[action.payload.id]: is the post at key of id`
      }

    case SUBMIT_FORM:
      return {
        ...state
      }

    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  if (action.filter !== 'all') {
    return state;
  }
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return action.payload.map(post => {
        return post.id
      }
    );
    default:
      return state;
  }
};

const idsByFilter = combineReducers({
  all: allIds,
});

const posts = combineReducers({
  postsById,
  idsByFilter,
});

export default posts;

export const getVisiblePosts = (state, filter) => {
  const ids = state.idsByFilter[filter];
  return ids.map(id => state.postsById[id]);
};
