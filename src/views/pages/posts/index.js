import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Modal from '../../containers/modal';
import RemoteSubmitForm, { RemoteSubmitButton } from '../../components/form'
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

  constructor(props) {
    super(props)
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
    const { posts, updatePost, openEditModal, deletePost, isEditing, ...rest } = this.props;
    return (
      <div>
        <div className="g-row">
          <div className="g-col">
            <div style={{marginTop: '20px'}}>
              <button className="btn add-post">Add a Post</button>
            </div>
            <PostList
              {...rest}
              posts={posts}
              updatePost={updatePost}
              toggleEditPost={openEditModal}
              deletePost={deletePost}
            />
          </div>
        </div>
        <Modal />
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
