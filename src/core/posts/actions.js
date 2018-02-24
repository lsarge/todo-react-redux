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

export function addPost() {
  console.log('adding')
  return {
    type: OPEN_MODAL,
    payload: {
      modalType: 'POST_FORM',
    }
  }
}


export function editPost(post) {
  console.log('editing', post)

  return {
    type: OPEN_MODAL,
    payload: {
      modalType: 'POST_FORM',
      post,
    }
  }
}


export function createPost(props, user) {
  const { token } = props;
  const { title, content } = props.values;
  let data = {
    note: {
      title,
      content,
    }
  }

  return dispatch => {
    return fetch('http://localhost:4000/notes', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    })
    .then(response => response.json())
    .then(data => dispatch(createPostSuccess(data)))
    .catch(error => console.log(error));
  }
}

export function updatePost(props, changes) {

  let {  title, content } = changes;
  let { id, token } = props;

  let data = {
    title,
    content,
    id,
  }

  return dispatch => {
    return fetch(`http://localhost:4000/notes/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => dispatch(updatePostSuccess(data)));
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

export function createPostError(error) {
  return {
    type: CREATE_POST_ERROR,
    payload: error,
  };
}

export function createPostSuccess(post, filter) {
  filter = filter || 'all'; // not sure how to deal with this
  return {
    type: CREATE_POST_SUCCESS,
    payload: post,
    filter,
  };
}

export function loadPostsSuccess(posts, filter) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
    filter,
  };
}

export function updatePostSuccess(post) {
  debugger;
  return {
    type: UPDATE_POST_SUCCESS,
    payload: post,
  };
}


export function submitForm(values, dispatch, props) {
  const { id, token } = props;
  return props.id ? dispatch(updatePost(props, values)) : dispatch(createPost(props, values));
}

export function fetchPosts(filter, auth) {
  return dispatch => {
    dispatch(requestPosts
      (filter))
    return fetch('http://localhost:4000/notes', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth,
      }
    })
      .then(response => response.json())
      .then(json => dispatch(loadPostsSuccess(json, filter)))
      .catch(error => console.log('error', error));
  }
}
