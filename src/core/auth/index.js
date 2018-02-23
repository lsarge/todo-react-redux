// import { firebaseAuth } from 'src/core/firebase';
import * as authActions from './actions';


export { authActions };
export * from './action-types';
export { authReducer } from './reducer';
export { getAuth, isAuthenticated } from './selectors';


export function initAuth(dispatch) {
  const token = localStorage.token;

  return new Promise((resolve, reject) => {
    if (!token) {
      resolve();
    } else {
      return fetch('http://localhost:4000/notes', {
        'headers': {
          'Authorization': token,
        },
      })
      .then(handleResponse.bind(this, dispatch, resolve, reject, token))
      .catch(function(error) {
        console.log('error', error);
      })
    }
  });
}

function handleResponse(dispatch, resolve, reject, token, response) {
  if (response.status === 200) {
    dispatch(authActions.loginUserSuccess(token));
    resolve();
  } else if (response.status === 401) {
    dispatch(authActions.loginUserFailure(token));
    resolve();
  } else {
    reject();
  }
}
