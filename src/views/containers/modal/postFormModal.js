import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Button } from 'react-mdl';
import { PostForm } from '../../components/form'

const pStyle = {
  float: 'right',
  marginBottom: '20px',
};

export class PostFormModal extends Component {
  render() {
    return (
      <div className={classNames('modal-backdrop')}>
        <div className={classNames('modal-content')}>
          <Button
            style={pStyle}
            onClick={this.props.closeModal}>
            close
          </Button>
          <PostForm />
        </div>
      </div>
    )
  }
}

export default PostFormModal;
