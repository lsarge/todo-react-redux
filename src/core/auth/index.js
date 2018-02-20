import { firebaseAuth } from 'src/core/firebase';
import * as authActions from './actions';


export { authActions };
export * from './action-types';
export { homeReducer } from './reducer';
export { getAuth, isAuthenticated } from './selectors';


export function initAuth(dispatch) {

  // return  fetch('http://localhost:4000/users/login', {
  //   'method': 'POST'
  // })


  return new Promise((resolve, reject) => {
    dispatch(authActions.initAuth({}));
    resolve();
  })


  
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
}
