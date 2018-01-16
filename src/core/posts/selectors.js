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
  (posts) => posts
);
