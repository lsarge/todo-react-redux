import React, { PropTypes } from 'react';
import { List } from 'immutable';
import PostItem from '../post-item';

function PostList({addImage, deletePost, editPost, updatePost, posts, token}) {
  let postItems = posts.map((post, index) => (
      <PostItem
        deletePost={deletePost}
        key={index}
        post={post}
        editPost={editPost}
        updatePost={updatePost}
        token={token}
        addImage={addImage}
      />
    )
  );

  return (
    <div className="post-list">
      {postItems}
    </div>
  );
}

PostList.propTypes = {
  deletePost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired
};

export default PostList;
