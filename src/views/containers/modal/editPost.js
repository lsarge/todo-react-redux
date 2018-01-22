import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { modalActions } from 'src/core/modal';

import RemoteSubmitForm, { RemoteSubmitButton } from '../../components/form'

export class EditModal extends Component {
  static propTypes = {

  }


  render() {
    console.log('props of edit modal', this.props);
    const { title, body } = this.props.attributes;
    return (
      <div className={classNames('modal-backdrop')}>
        <div className={classNames('modal-content')}>
          <h1>{ title }</h1>
          <p>{ body }</p>
          <RemoteSubmitForm />
          <RemoteSubmitButton />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    // id: ownProps.id
  };
};

export default connect()(EditModal)
