import { getDeletedTask } from './selectors';

import {
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS,
  FETCH_POSTS_SUCCESS,
  UPDATE_POST_SUCCESS,
  REQUEST_POSTS
} from './action-types';

export function updatePost(post, changes) {
  let { published } = changes;
  let { self } = post.links;
  let { id } = post;
  let data = {
    data: {
      id,
      type: 'posts',
      attributes: {
        published
      }
    }
  }
  return dispatch => {
    return fetch(self, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      }
    })
    .then(response => response.json())
    .then(json => dispatch(updatePostSuccess(json.data)));
  };
}

export function deletePost(post) {
  return dispatch => {
    // taskList.remove(task.key)
    //   .catch(error => dispatch(deleteTaskError(error)));
    return fetch()
    // ....
  };
}

function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

export function createPost(title) {
  return dispatch => {
    postList.push({completed: false, title})
      .catch(error => dispatch(createPostError(error)));
  };
}

export function createPostError(error) {
  return {
    type: CREATE_POST_ERROR,
    payload: error
  };
}

export function createPostSuccess(post) {
  return {
    type: CREATE_POST_SUCCESS,
    payload: post
  };
}

export function loadPostsSuccess(posts) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts
  };
}

export function updatePostSuccess(post) {
  return {
    type: UPDATE_POST_SUCCESS,
    payload: post
  };
}

export function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts())
    return fetch('http://localhost:4000/api/v1/posts', {
      headers: {
        'Content-Type': 'application/vnd.api+json'
      }
    })
    .then(response => response.json())
    .then(json => dispatch(loadPostsSuccess(json.data)));
  }
}
