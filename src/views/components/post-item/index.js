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
    let checked = !this.props.post.completed;
    this.props.updatePost(this.props.post, {completed: checked});
  }

  render() {
    //const { editing } = this.state;
    const { post } = this.props;
    console.log('post', post)

    return (
      <div>
      {post.attributes.title}
          <button
            onClick={this.toggleStatus}
            type="button">
          </button>
      </div>
    );
  }
}

export default PostItem;
