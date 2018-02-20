import { isAuthenticated } from 'src/core/auth';
import App from './app';
import SignIn from './pages/sign-in';
import Register from './pages/register';
import Tasks from './pages/tasks';
import Posts from './pages/posts';

export const paths = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  TASKS: '/',
  POSTS: '/posts'
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
      replace(paths.TASKS);
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
      // {
      //   path: paths.SIGN_IN,
      //   component: SignIn,
      //   onEnter: requireUnauth(getState)
      // },
      {
          path: paths.SIGN_IN,
          component: SignIn,
          onEnter: requireUnauth(getState)
      },
      {
        path: paths.POSTS,
        component: Posts,
        onEnter: requireAuth(getState)
      }
    ]
  };
};
