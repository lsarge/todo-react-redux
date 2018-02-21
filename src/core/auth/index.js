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
      .then(handleRepsone.bind(this, dispatch, resolve, reject, token))
      .catch(function(error) {
        console.log('error', error);
      })
    }
  });
}

function handleRepsone(dispatch, resolve, reject, token, response) {
  if (response.status === 200) {
    dispatch(authActions.setAuthState(true, token));
    resolve();
  } else {
    reject();
  }
}
