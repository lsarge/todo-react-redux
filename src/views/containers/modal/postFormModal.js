import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { PostForm } from '../../components/form'

const pStyle = {
  float: 'right',
};

export class PostFormModal extends Component {
  render() {
    console.log('edit modal props', this.props);
    return (
      <div className={classNames('modal-backdrop')}>
        <div className={classNames('modal-content')}>
          <button
            onClick={this.props.closeModal}
            style={pStyle}>
            close
          </button>
          <PostForm />
        </div>
      </div>
    )
  }
}



export default connect()(PostFormModal)
