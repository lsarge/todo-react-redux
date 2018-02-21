export function getAuth(state) {
  return state.auth;
}

export function isAuthenticated(state) {
  console.log('getAuth(state).authenticated',getAuth(state).authenticated)
  return getAuth(state).authenticated;
}
