import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import classNames from 'classnames';

import RemoteSubmitForm, { RemoteSubmitButton } from '../../components/form'

const pStyle = {
  float: 'right',
};

export class EditModal extends Component {
  render() {
    const enabled = false;
    return (
      <div className={classNames('modal-backdrop')}>
        <div className={classNames('modal-content')}>
            <button onClick={this.props.closeModal} style={pStyle}>close</button>
          <RemoteSubmitForm />
          <RemoteSubmitButton enabled={enabled} />
        </div>
      </div>
    )
  }
}



export default connect()(EditModal)
