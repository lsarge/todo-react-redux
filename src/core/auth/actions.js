import bcrypt from 'bcryptjs';
import genSalt from '../utils/salt';
import auth from '../utils/auth';
import * as errorMessages  from './message-constants';

import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  CHANGE_FORM,
  SENDING_REQUEST,
  SET_ERROR_MESSAGE,
  SET_AUTH
} from './action-types';


// function authenticate(provider) {
//   return dispatch => {
//     firebaseAuth.signInWithPopup(provider)
//       .then(result => dispatch(signInSuccess(result)))
//       .catch(error => dispatch(signInError(error)));
//   };
// }

export function initAuth(user) {
  return {
    type: INIT_AUTH,
    payload: user
  };
}

export function signInError(error) {
  return {
    type: SIGN_IN_ERROR,
    payload: error
  };
}

export function signInSuccess(result) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: result.user
  };
}

export function signInWithGithub() {
  return authenticate(new firebase.auth.GithubAuthProvider());
}


export function signInWithGoogle() {
  return authenticate(new firebase.auth.GoogleAuthProvider());
}


export function signInWithTwitter() {
  return authenticate(new firebase.auth.TwitterAuthProvider());
}

export function signOut() {
  return dispatch => {
    firebaseAuth.signOut()
      .then(() => dispatch(signOutSuccess()));
  };
}

export function signOutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS
  };
}


// new local login stuff
/**
 * Logs an user in
 * @param  {string} username The username of the user to be logged in
 * @param  {string} password The password of the user to be logged in
 */
export function login(username, password) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    // If no username or password was specified, throw a field-missing error
    if (anyElementsEmpty({ username, password })) {
      dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
      dispatch(sendingRequest(false));
      return;
    }
    // Generate salt for password encryption
    const salt = genSalt(username);
    // Encrypt password
    bcrypt.hash(password, salt, (err, hash) => {
      // Something wrong while hashing
      if (err) {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
        return;
      }
      // Use auth.js to fake a request
      // auth.login(username, hash, (success, err) => {
      //   // When the request is finished, hide the loading indicator
      //   dispatch(sendingRequest(false));
      //   dispatch(setAuthState(success));
      //   if (success === true) {
      //     // If the login worked, forward the user to the dashboard and clear the form
      //     forwardTo('/dashboard');
      //     dispatch(changeForm({
      //       username: "",
      //       password: ""
      //     }));
      //   } else {
      //     switch (err.type) {
      //       case 'user-doesnt-exist':
      //         dispatch(setErrorMessage(errorMessages.USER_NOT_FOUND));
      //         return;
      //       case 'password-wrong':
      //         dispatch(setErrorMessage(errorMessages.WRONG_PASSWORD));
      //         return;
      //       default:
      //         dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
      //         return;
      //     }
      //   }
      // });
      const user = {user: {email: username, password: hash}};
      return fetch('http://localhost:4000/users/login', {
        'method': 'POST',
        'headers' : {
          'Content-Type': 'application/json',
        },
        'body': JSON.stringify(user),
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        localStorage.setItem('token', data.auth_token);
        return dispatch(setAuthState(true, data.auth_token))
      })
      .catch(function(error) {
        console.log(error);
      })
    });
  }
}

/**
 * Logs the current user out
 */
export function logout() {
  return (dispatch) => {
    dispatch(sendingRequest(true));
    auth.logout((success, err) => {
      if (success === true) {
        dispatch(sendingRequest(false))
        dispatch(setAuthState(false));
        browserHistory.replace(null, '/');
      } else {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
      }
    });
  }
}


/**
 * Sets the authentication state of the application
 * @param {boolean} newState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newState, token) {
  console.log('token', token);
  return {
    type: SET_AUTH,
    newState,
    token
  };
}

/**
 * Registers a user
 * @param  {string} username The username of the new user
 * @param  {string} password The password of the new user
 */
export function register(username, password) {
  return (dispatch) => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));
    // If no username or password was specified, throw a field-missing error
    if (anyElementsEmpty({ username, password })) {
      dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
      dispatch(sendingRequest(false));
      return;
    }
    // Generate salt for password encryption
    const salt = genSalt(username);
    // Encrypt password
    bcrypt.hash(password, salt, (err, hash) => {
      // Something wrong while hashing
      if (err) {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
        return;
      }
      // Use auth.js to fake a request
      // auth.register(username, hash, (success, err) => {
      //   // When the request is finished, hide the loading indicator
      //   dispatch(sendingRequest(false));
      //   dispatch(setAuthState(success));
      //   if (success) {
      //     // If the register worked, forward the user to the homepage and clear the form
      //     forwardTo('/dashboard');
      //     dispatch(changeForm({
      //       username: "",
      //       password: ""
      //     }));
      //   } else {
      //     switch (err.type) {
      //       case 'username-exists':
      //         dispatch(setErrorMessage(errorMessages.USERNAME_TAKEN));
      //         return;
      //       default:
      //         dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
      //         return;
      //     }
      //   }
      // });
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: {email: username, password: hash}}),
      }
      return fetch('http://localhost:4000/users', config)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log('data------------', data);
        })
        .catch(function(error) {
          console.log('error -------------', error);
        })

    });
  }
}

/**
 * Sets the form state
 * @param  {object} newState          The new state of the form
 * @param  {string} newState.username The new text of the username input field of the form
 * @param  {string} newState.password The new text of the password input field of the form
 * @return {object}                   Formatted action for the reducer to handle
 */
export function changeForm(newState) {
  return { type: CHANGE_FORM, newState };
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}


/**
 * Sets the errorMessage state, which displays the ErrorMessage component when it is not empty
 * @param message
 */
function setErrorMessage(message) {
  return (dispatch) => {
    dispatch({ type: SET_ERROR_MESSAGE, message });

    const form = document.querySelector('.form-page__form-wrapper');
    if (form) {
      form.classList.add('js-form__err-animation');
      // Remove the animation class after the animation is finished, so it
      // can play again on the next error
      setTimeout(() => {
        form.classList.remove('js-form__err-animation');
      }, 150);

      // Remove the error message after 3 seconds
      setTimeout(() => {
        dispatch({ type: SET_ERROR_MESSAGE, message: '' });
      }, 3000);
    }
  }
}

/**
 * Forwards the user
 * @param {string} location The route the user should be forwarded to
 */
function forwardTo(location) {
  console.log('forwardTo(' + location + ')');
  browserHistory.push(location);
}


/**
 * Checks if any elements of a JSON object are empty
 * @param  {object} elements The object that should be checked
 * @return {boolean}         True if there are empty elements, false if there aren't
 */
function anyElementsEmpty(elements) {
  for (let element in elements) {
    if (!elements[element]) {
      return true;
    }
  }
  return false;
}
