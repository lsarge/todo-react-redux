import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Record } from 'immutable'

class PostItem extends Component {
  static propTypes = {
    deletePost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    post: PropTypes.instanceOf(Record).isRequired,
    token: PropTypes.string.isRequired,
    addImage: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.delete = ::this.delete;
    this.toggleStatus = ::this.toggleStatus;
    this.editPost = ::this.editPost;
    this.addImage = ::this.addImage;
  }

  addImage() {
    this.props.addImage(this.props.post);
  }

  delete() {
    this.props.deletePost(this.props.task);
  }

  editPost(event) {
    let isOpen = event.currentTarget.id === 'edit';
    this.props.editPost(this.props.post);
  }

  toggleStatus() {
    let { post, token } = this.props;
    this.props.updatePost(post, {published: !post.published}, token);
    debugger;
  }

  render() {
    const { post } = this.props;
    return (
      <div className={classNames('post-item')}>
        <div className="cell">
          <button
            tabIndex="0"
            id="edit"
            className={classNames('btn post-item__edit-button ')}
            onClick={this.editPost}>
            { post.title }
          </button>
        </div>
        <div className="cell">
          <button
            className={classNames('btn post-item__button')}
            onClick={this.toggleStatus}
            type="button">
            <svg className={classNames('icon', {'icon--active': post.published})} width="24" height="24" viewBox="0 0 24 24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </button>
        </div>
        <div className="cell">
          <button
            className={classNames('btn post-item__button')}
            onClick={this.addImage}
            type="button">
            <svg className={classNames('icon icon-upload', {'icon--active': post.published})} width="24" height="24" viewBox="0 0 24 24">
              <path id="svg_5" d="m5.639066,12.331316l6.242495,-6.725598l6.242495,6.725598l-3.121248,0l0,6.75796l-6.242494,0l0,-6.75796l-3.121248,0z" fill="none"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default PostItem;
