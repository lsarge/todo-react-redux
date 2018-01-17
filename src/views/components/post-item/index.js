import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Post } from 'src/core/posts';

class PostItem extends Component {
  static propTypes = {
    deletePost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    post: PropTypes.instanceOf(Post).isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.delete = ::this.delete;
    this.toggleStatus = ::this.toggleStatus;
  }

  delete() {
    this.props.deletePost(this.props.task);
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
        { post.attributes.title }
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
