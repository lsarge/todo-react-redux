import { combineReducers } from 'redux';

import { Record, List, Map, fromJS } from 'immutable';

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

import { Post } from './post';

export const PostsState = new Record({
  idsByFilter: new Map(),
  postsById: new Map(),
  selectedPost: null,
});

const postsById = (state = new PostsState(), action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      let nextState = { ...state };
      action.payload.forEach(post => {
        nextState[post.id] = new Post(post);
      });
      return nextState;

    case UPDATE_POST_SUCCESS:
      return {
        ...state, [action.payload.id]: new Post(action.payload)  // `[action.payload.id]: is the post at key of id`
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

const selectedPost = (state = {}, action ) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        post: action.payload.post
      }
    default:
      return state
  }
}

const idsByFilter = combineReducers({
  all: allIds,
});

const posts = combineReducers({
  selectedPost,
  postsById,
  idsByFilter,
});

export default posts;

export const getVisiblePosts = (state, filter) => {
  const ids = state.idsByFilter[filter];
  return ids.map(id => state.postsById[id]);
};
