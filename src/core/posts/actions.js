import {
  CREATE_POST_ERROR,
  CREATE_POST_SUCCESS,
  EDIT_POST_START,
  EDIT_POST_END,
  OPEN_MODAL,
  FETCH_POSTS_SUCCESS,
  UPDATE_POST_SUCCESS,
  REQUEST_POSTS,
  SUBMIT_FORM
} from './action-types';

export function updatePost(post, changes) {
  let { published, title, body } = changes;
  let { self } = post.links;
  let { id } = post;
  let data = {
    data: {
      id,
      type: 'posts',
      attributes: {
        published,
        title,
        body,
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
    payload: error,
  };
}

export function createPostSuccess(post) {
  return {
    type: CREATE_POST_SUCCESS,
    payload: post,
  };
}

export function openEditModal(id) {
  return {
    type: OPEN_MODAL,
    payload: {
      modalType: 'EDIT_MODAL',
      id,
    }
  }
}

export function toggleEditPost(post, isOpen) {
  let type = isOpen ? EDIT_POST_START : EDIT_POST_END;
  return {
    type: type,
    payload: post,
  }
}

export function loadPostsSuccess(posts, filter) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
    filter,
  };
}

export function updatePostSuccess(post) {
  return {
    type: UPDATE_POST_SUCCESS,
    payload: post,
  };
}

export function submitForm(values, dispatch, props) {
  return dispatch(updatePost(props, values));
}

export function fetchPosts(filter) {
  return dispatch => {
    dispatch(requestPosts(filter))
    return fetch('http://localhost:4000/api/v1/posts', {
      headers: {
        'Content-Type': 'application/vnd.api+json',
      },
    })
    .then(response => response.json())
    .then(json => dispatch(loadPostsSuccess(json.data, filter)));
  }
}
