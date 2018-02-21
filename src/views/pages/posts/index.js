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
    addPost: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.instanceOf(List).isRequired,
    filter: PropTypes.oneOf(['all', 'published', 'draft']).isRequired,
    token: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.addPost = ::this.addPost;
  }

  addPost() {
    this.props.addPost(this.props.post);
  }

  closeModal(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.toggleEditPost();
  }

  componentWillMount() {
    const { dispatch, filter, token } = this.props;
    this.props.fetchPosts(filter, token);
  }

  render() {
    const { posts, updatePost, openEditModal, deletePost, isEditing, ...rest } = this.props;

    console.log('posts', posts);
    return (
      <div>
        <div className="g-row">
          <div className="g-col">
            <div style={{marginTop: '20px'}}>
              <button className="btn add-post" onClick={this.addPost}>Add a Post</button>
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
  const token = state.auth.token;

  return {
    posts: getVisiblePosts(state, filter),
    filter,
    token,
  };
};

const mapDispatchToProps = Object.assign(
  {},
  postsActions
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Posts))
