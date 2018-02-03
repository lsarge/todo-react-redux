import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Record } from 'immutable'

class PostItem extends Component {
  static propTypes = {
    deletePost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    post: PropTypes.instanceOf(Record).isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.delete = ::this.delete;
    this.toggleStatus = ::this.toggleStatus;
    this.editPost = ::this.editPost;
  }

  delete() {
    this.props.deletePost(this.props.task);
  }

  editPost(event) {
    let isOpen = event.currentTarget.id === 'edit';
    this.props.editPost(this.props.post);
  }

  toggleStatus() {
    let { published } = this.props.post.attributes;
    this.props.updatePost(this.props.post, {published: !published});
  }

  render() {
    const { post } = this.props;
    return (
      <div className={classNames('post-item', {'post-item--completed': post.attributes.published})}>
        <div className="cell">
          <button
            tabIndex="0"
            id="edit"
            className={classNames('btn post-item__edit-button ')}
            onClick={this.editPost}>
            { post.attributes.title }
          </button>
        </div>
        <div className="cell">
          <button
            className={classNames('btn post-item__button')}
            onClick={this.toggleStatus}
            type="button">
            <svg className={classNames('icon', {'icon--active': post.attributes.published})} width="24" height="24" viewBox="0 0 24 24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default PostItem;
