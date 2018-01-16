import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import PostList from '../../components/post-list';

import { postsActions, getVisiblePosts } from 'src/core/posts';

export class Posts extends Component {

  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.instanceOf(List).isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  componentWillMount() {
    const { dispatch } = this.props
    this.props.fetchPosts();
  }
  render() {
    const { posts, updatePost, deletePost, isLoading } = this.props;
    return (
      <div>
        <PostList
          posts={posts}
          updatePost={updatePost}
          deletePost={deletePost}
          />
      </div>
    )
  }
}

const isLoading = state => state.posts.isLoading

const mapStateToProps = createSelector(
  getVisiblePosts,
  isLoading,
  (posts, isLoading) => ({
    posts,
    isLoading
  })
);

const mapDispatchToProps = Object.assign(
  {},
  postsActions
);


console.log('mapDispatchToProps', mapDispatchToProps);

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
