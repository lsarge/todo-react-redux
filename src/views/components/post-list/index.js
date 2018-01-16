import React, { PropTypes } from 'react';
import { List } from 'immutable';
import PostItem from '../post-item';

function PostList({deletePost, updatePost, posts}) {
  let postItems = posts.map((post, index) => {
    return (
      <PostItem
        deletePost={deletePost}
        key={index}
        post={post}
        updatePost={updatePost}
      />
    );
  });

  return (
    <div className="post-list">
      {postItems}
    </div>
  );
}

PostList.propTypes = {
  deletePost: PropTypes.func.isRequired,
  posts: PropTypes.instanceOf(List).isRequired,
  updatePost: PropTypes.func.isRequired
};

export default PostList;
