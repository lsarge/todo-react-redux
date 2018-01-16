import { createSelector } from 'reselect';


export function getPosts(state) {
  return state.posts;
}

export function getPostList(state) {
  return getPosts(state).list;
}

export function getPostFilter(state) {
  return getPosts(state).filter;
}

export function getDeletedPost(state) {
  return getPosts(state).deleted;
}


//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisiblePosts = createSelector(
  getPostList,
  getPostFilter,
  (posts, filter) => {
    switch (filter) {
      case 'active':
        return posts.filter(post => !post.completed);

      case 'completed':
        return posts.filter(post => post.completed);

      default:
        return posts;
    }
  }
);
