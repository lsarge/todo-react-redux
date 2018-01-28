import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import classNames from 'classnames';

import RemoteSubmitForm from '../../components/form'

const pStyle = {
  float: 'right',
};

export class EditModal extends Component {
  render() {
    return (
      <div className={classNames('modal-backdrop')}>
        <div className={classNames('modal-content')}>
          <button
            onClick={this.props.closeModal}
            style={pStyle}>
            close
          </button>
          <RemoteSubmitForm />
        </div>
      </div>
    )
  }
}



export default connect()(EditModal)
