import { firebaseAuth } from 'src/core/firebase';
import * as authActions from './actions';


export { authActions };
export * from './action-types';
export { homeReducer } from './reducer';
export { getAuth, isAuthenticated } from './selectors';


export function initAuth(dispatch) {

  console.log('init')

  // return  fetch('http://localhost:4000/users/login', {
  //   'method': 'POST'
  // })


  // return new Promise((resolve, reject) => {
  //   dispatch(authActions.initAuth({}));
  //   resolve();
  // })



  // return new Promise((resolve, reject) => {
  //   const unsub = firebaseAuth.onAuthStateChanged(
  //     user => {
  //       dispatch(authActions.initAuth(user));
  //       unsub();
  //       resolve();
  //     },
  //     error => reject(error)
  //   );
  // });

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
      .then(function(response) {
        response.status === 200 ? resolve() : reject(error);
      })
      .catch(function(error) {
        console.log('error', error);
      })
    }
  });
}
