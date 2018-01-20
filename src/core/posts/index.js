import * as postsActions from './actions';
import posts, * as fromPosts from './reducer';

export { postsActions };
export * from './action-types';
export postsReducer from './reducer';

export const getVisiblePosts = (state, filter) =>
  fromPosts.getVisiblePosts(state.posts, filter);
