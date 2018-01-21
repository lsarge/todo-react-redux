import React, { PropTypes } from 'react';
import { List } from 'immutable';
import classNames from 'classnames';

function EditModal(props) {
  
  const { title, body } = props.attributes;

  return (
    <div className={classNames('modal-backdrop')}>
      <div className={classNames('modal-content')}>
        <button>close</button>
        <h1>{title}</h1>
        <p>{ body }</p>
      </div>
    </div>
  );
}

export default EditModal;
