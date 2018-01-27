import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import classNames from 'classnames';

const style = {
  padding: '10px 20px',
  width: 140,
  display: 'block',
  margin: '20px auto',
  fontSize: '16px',
};

const RemoteSubmitButton = ( props ) => {
const { hasErrors } = props;
  return  (
    <button
      disabled={hasErrors}
      tabIndex="0"
      className={classNames('btn form-submit')}
      type="button"
      style={style}
      onClick={() => dispatch(submit('remoteSubmit'))}>
      Submit
    </button>
  )
};

export default connect((state) => {
  return {
    hasErrors: !!state.form.remoteSubmit.syncErrors
  }
})(RemoteSubmitButton);