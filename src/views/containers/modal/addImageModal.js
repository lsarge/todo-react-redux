import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Button } from 'react-mdl';
import { AddImageForm } from '../../components/form'

const pStyle = {
  float: 'right',
  marginBottom: '20px',
};

export class AddImageModal extends Component {
  render() {
    return (
      <div className={classNames('modal-backdrop')}>
        <div className={classNames('modal-content')}>
          <Button
            style={pStyle}
            onClick={this.props.closeModal}>
            close
          </Button>
          <AddImageForm />
        </div>
      </div>
    )
  }
}

export default AddImageModal;
