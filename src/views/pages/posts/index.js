import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Modal from 'react-modal';

import PostList from '../../components/post-list';

import { postsActions, getVisiblePosts } from 'src/core/posts';

export class Posts extends Component {

  static propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      attributes: PropTypes.shape({
        body: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        published: PropTypes.bool.isRequired,
      })
    })).isRequired,
    filter: PropTypes.oneOf(['all', 'published', 'draft']).isRequired,
  }

  closeModal(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.toggleEditPost();
  }

  componentWillMount() {
    const { dispatch, filter } = this.props;
    this.props.fetchPosts(filter);
  }

  render() {
    const { posts, toggleEditPost, updatePost, deletePost, isEditing, ...rest } = this.props;
    return (
      <div className="g-row">
        <div className="g-col">
          <PostList
            {...rest}
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

const isEditing = state => state.posts.isEditing

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';

  return {
    posts: getVisiblePosts(state, filter),
    filter,
  };
};

const mapDispatchToProps = Object.assign(
  {},
  postsActions
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))
