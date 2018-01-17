import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Modal from 'react-modal';

import PostList from '../../components/post-list';

import { postsActions, getVisiblePosts } from 'src/core/posts';

export class Posts extends Component {

  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.instanceOf(List).isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  closeModal(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.toggleEditPost();
  }

  componentWillMount() {
    const { dispatch } = this.props
    this.props.fetchPosts();
  }

  render() {
    const { posts, toggleEditPost, updatePost, deletePost, isLoading, isEditing } = this.props;
    return (
      <div className="g-row">
        <div className="g-col">
          <PostList
            posts={posts}
            updatePost={updatePost}
            toggleEditPost={toggleEditPost}
            deletePost={deletePost}
          />
        </div>
        <Modal
          isOpen={isEditing}
          backdropClosesModal
          onRequestClose={() => this.closeModal()}
          ariaHideApp={false}>

          <a href="" onClick={(event) => this.closeModal(event)} className="close">close</a>
        </Modal>
      </div>

    )
  }
}

const isLoading = state => state.posts.isLoading
const isEditing = state => state.posts.isEditing

const mapStateToProps = createSelector(
  getVisiblePosts,
  isLoading,
  isEditing,
  (posts, isLoading, isEditing) => ({
    posts,
    isLoading,
    isEditing
  })
);

const mapDispatchToProps = Object.assign(
  {},
  postsActions
);

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
