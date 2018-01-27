import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { postsActions } from 'src/core/posts'

export RemoteSubmitButton from './remoteSubmitButton'

const required = value => (value ? undefined : 'Required')

const renderField = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className="post-item__input" />
        {touched && error && <span className="validation-error">{error}</span>}
      </div>
    </div>
  )
}

const renderTextarea = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-field">
    <label>{label}</label>
    <div>
      <textarea {...input}
        className="post-item__textarea"
        rows="2"
        cols="50"
        placeholder={label}
        type={type}
        style={{resize: 'none'}} />
      {touched && error && <span className="validation-error">{error}</span>}
    </div>
  </div>
);

let RemoteSubmitForm = props => {
  const { error, handleSubmit, syncErrors } = props;

  console.log('props', props);

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="title"
        type="text"
        validate={[required]}
        component={renderField}
        label="title"
      />
      <Field
        name="body"
        type="textarea"
        validate={[required]}
        component={renderTextarea}
        label="body"
      />
      {error && <strong>{error}</strong>}
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
