import { isAuthenticated } from 'src/core/auth';
import App from './app';
import SignIn from './pages/sign-in';
import Register from './pages/register';
import Posts from './pages/posts';

export const paths = {
  POSTS: '/',
  ROOT: '/',
  SIGN_IN: '/sign-in',
  REGISTER: '/register',
};

const requireAuth = getState => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.SIGN_IN);
    }
  };
};

const requireUnauth = getState => {
  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.POSTS);
    }
  };
};

export const getRoutes = getState => {
  return {
    path: paths.ROOT,
    component: App,
    childRoutes: [
      {
        indexRoute: {
          component: Posts,
          onEnter: requireAuth(getState)
        }
      },
      {
        path: paths.SIGN_IN,
        component: SignIn,
        onEnter: requireUnauth(getState)
      },
      {
        path: paths.POSTS,
        component: Posts,
        onEnter: requireAuth(getState)
      },
      {
        path: paths.REGISTER,
        component: Register,
        onEnter: requireUnauth(getState)
      }
    ]
  };
};
