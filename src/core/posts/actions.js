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
  return {
    type: OPEN_MODAL,
    payload: {
      modalType: 'POST_FORM',
    }
  }
}


export function editPost(post) {
  return {
    type: OPEN_MODAL,
    payload: {
      modalType: 'POST_FORM',
      post,
    }
  }
}

export function addImage(post) {
  return {
    type: OPEN_MODAL,
    payload: {
      modalType: 'ADD_IMAGE',
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

export function updatePost(props, changes, token) {
  token = token || props.token;
  let { id } = props;
  let data = changes;

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
  console.log('posts loaded---------', posts);
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


export function submitPostForm(values, dispatch, props) {
  const { id, token } = props;
  return props.id ? dispatch(updatePost(props, values)) : dispatch(createPost(props, values));
}

export function submitUploadForm(values, dispatch, props) {
  const file = values.upload[0];
  const { id, token } = props;

  let formData = new FormData();
  formData.append('note[upload]', file);

  return fetch(`http://localhost:4000/notes/${id}/`, {
    'method': 'PUT',
    'headers': {
      'Authorization': token,
    },
    'body': formData
  }).then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data)
  })
  .catch(function(error) {
    console.log('error--------------', error);
  })
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
