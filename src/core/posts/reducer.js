import { List, Record } from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from 'src/core/auth';

import {
  CREATE_POST_SUCCESS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_REQUEST,
  UPDATE_POST_SUCCESS,
  REQUEST_POSTS
} from './action-types';


export const PostsState = new Record({
  deleted: null,
  filter: '',
  list: new List(),
  previous: null,
  isLoading: false
});

export function postsReducer(state = new PostsState(), {payload, type}) {
  switch (type) {

    case REQUEST_POSTS:
      return state.set('isLoading', true);

    case FETCH_POSTS_SUCCESS:
      return state.merge({
        'list': new List(payload.reverse()),
        'isLoading': false
      });

    case UPDATE_POST_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.list.map(post => {
          return post.id === payload.id ? payload : post;
        })
      });

    default:
      return state;
  }
}
