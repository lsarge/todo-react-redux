import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  SET_ERROR_MESSAGE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
} from './action-types';

import auth from '../utils/auth';

// The initial application state
const initialState = {
  formState: {
    username: '',
    password: ''
  },
  currentlySending: false,
  authenticated: false,
  errorMessage: '',
  token: ''
};

// Takes care of changing the application state
export function authReducer(state = initialState, action) {
  switch (action.type) {

    case LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        currentlySending: true,
      });

    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        token: action.payload.token,
        authenticated: true,
        currentlySending: false,
      });

    case LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.payload.statusText,
        currentlySending: false,
        authenticated: false,
      });

    case LOGOUT_USER:
      return Object.assign({}, state, {
        authenticated: false,
      });

    case CHANGE_FORM:
      return Object.assign({}, state, {
        formState: action.newState
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
