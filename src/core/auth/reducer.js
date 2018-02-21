// import { Record } from 'immutable';
// import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from './action-types';
//
//
// export const AuthState = new Record({
//   authenticated: false,
//   id: null
// });
//
//
// export function authReducer(state = new AuthState(), {payload, type}) {
//   switch (type) {
//     case INIT_AUTH:
//     case SIGN_IN_SUCCESS:
//       return state.merge({
//         authenticated: !!payload,
//         id: payload ? payload.uid : null
//       });
//
//     case SIGN_OUT_SUCCESS:
//       return new AuthState();
//
//     default:
//       return state;
//   }
// }


import { CHANGE_FORM, SET_AUTH, SENDING_REQUEST, SET_ERROR_MESSAGE } from './action-types';
// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
// const assign = Object.assign || require('object.assign');
import auth from '../utils/auth';

// The initial application state
const initialState = {
  formState: {
    username: '',
    password: ''
  },
  currentlySending: false,
  authenticated: auth.authenticated(),
  errorMessage: '',
  token: ''
};

// Takes care of changing the application state
export function authReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return Object.assign({}, state, {
        formState: action.newState
      });
      break;
    case SET_AUTH:
      return Object.assign({}, state, {
        authenticated: action.newState,
        token: action.token,
      });
      break;
    case SENDING_REQUEST:
      return Object.assign({}, state, {
        currentlySending: action.sending
      });
      break;
    case SET_ERROR_MESSAGE:
      return Object.assign({}, state, {
        errorMessage: action.message
      });
    default:
      return state;
  }
}
