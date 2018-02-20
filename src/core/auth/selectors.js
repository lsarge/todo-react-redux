export function getAuth(state) {
  return state.home;
}

export function isAuthenticated(state) {
  console.log(state);
  return getAuth(state).loggedIn;
}
