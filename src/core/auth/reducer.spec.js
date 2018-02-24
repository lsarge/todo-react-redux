import {
  INIT_AUTH,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from './action-types';

import { authReducer } from './reducer';

describe('Auth reducer', () => {
  describe('INIT_AUTH', () => {
    it('should set AuthState.authenticated to false when payload is null', () => {
      let state = authReducer(undefined, {
        type: INIT_AUTH,
        payload: null
      });
      expect(state.authenticated).toBe(false);
    });
  });

  describe('LOGIN_USER_SUCCESS', () => {
    it('should set AuthState.authenticated to true', () => {
      let state = authReducer(undefined, {
        type: LOGIN_USER_SUCCESS,
        payload: {token: null}
      });
      expect(state.authenticated).toBe(true);
    });

    it('should set currentlySending to false', () => {
      let state = authReducer(undefined, {
        type: LOGIN_USER_SUCCESS,
        payload: {token: null}
      });
      expect(state.currentlySending).toBe(false);
    });

    it('should set the token to false', () => {
      let state = authReducer(undefined, {
        type: LOGIN_USER_SUCCESS,
        payload: {token: '123'}
      });
      expect(state.token).toBe('123');
    });
  });

  describe('LOGOUT_USER', () => {
    it('should set authenticated to false', () => {
      let state = authReducer(undefined, {
        type: LOGOUT_USER,
      });
      expect(state.authenticated).toBe(false);
    });
  });
});
