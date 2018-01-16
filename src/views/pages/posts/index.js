import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import PostList from '../../components/post-list';

import { postsActions } from 'src/core/posts';

export class Posts extends Component {

  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    list: PropTypes.instanceOf(List).isRequired,
  }

  componentWillMount() {
    const { dispatch } = this.props
    this.props.fetchPosts();
  }
  render() {
    const { isLoading, list, updatePost, deletePost } = this.props;
    console.log('rendering posts page', list)

    return (
      <div>
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && <h2>Loaded...</h2>}
      <PostList
        posts={list}
        updatePost={updatePost}
        deletePost={deletePost}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { isLoading, list } = state.posts;
  console.log('list', list)
  console.log(state.posts);
    return {
        isLoading,
        list
    };
};

const mapDispatchToProps = Object.assign(
  {},
  postsActions
);


console.log('mapDispatchToProps', mapDispatchToProps);

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
