import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { postsActions } from 'src/core/posts'

export RemoteSubmitButton from './remoteSubmitButton'

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className="post-item__input" />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  )
}

const renderTextarea = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea {...input}
        className="post-item__textarea"
        rows="2"
        cols="50"
        placeholder={label}
        type={type}
        style={{resize: 'none'}} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

let RemoteSubmitForm = props => {
  const { error, handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="title"
        type="text"
        component={renderField}
        label="title"
      />
      <Field
        name="body"
        type="textarea"
        component={renderTextarea}
        label="body"
      />
      {error && <strong>{error}</strong>}
      <div>
        No submit button in the form. The submit button below is a separate unlinked component.
      </div>
    </form>
  );
};

const mapStateToProps = state => {
  const { id } = state.modal;
  const { links } = state.posts.postsById[id];
  const { attributes } = state.posts.postsById[id];

  return {
    id,
    links,
    initialValues: attributes,
  }
}

RemoteSubmitForm = reduxForm({
  form: 'remoteSubmit',
  onSubmit: postsActions.submitForm,
})(RemoteSubmitForm);


RemoteSubmitForm = connect(mapStateToProps)(RemoteSubmitForm)

export default RemoteSubmitForm;
