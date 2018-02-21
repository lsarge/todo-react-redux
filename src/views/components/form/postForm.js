import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'react-mdl';
import { postsActions } from 'src/core/posts'
import Uploader from'../../containers/uploader';

const required = value => (value ? undefined : 'Required')

const renderField = ({ placeholder, input, label, type, meta: { touched, error } }) => {
  return (
    <div className="form-field">
      <label>{label}</label>
      <div>
        <input {...input}
          autoComplete="off"
          placeholder={placeholder}
          type={type}
          className="post-item__input"
          />
        {touched && error && <span className="validation-error">{error}</span>}
      </div>
    </div>
  )
}

const renderTextarea = ({ placeholder, input, label, type, meta: { touched, error } }) => (
  <div className="form-field">
    <label>{label}</label>
    <div>
      <textarea {...input}
        className="post-item__textarea"
        rows="4"
        cols="50"
        placeholder={placeholder}
        type={type}
        style={{resize: 'none'}} />
        {touched && error && <span className="validation-error">{error}</span>}
    </div>
  </div>
);

const RenderResponseMessage = ({submitSucceeded}) => {
  return (
    <div>{submitSucceeded && <span>succeeed</span>}</div>
  )
}


let RemoteSubmitForm = props => {
  const {
    token,
    error,
    handleSubmit,
    pristine,
    reset,
    submitSucceeded,
    submitting,
    syncErrors,
  } = props;

  console.log(token);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <RenderResponseMessage submitSucceeded={submitSucceeded} />
        <Field
          name="title"
          type="text"
          validate={[required]}
          component={renderField}
          label="Title"
          placeholder="Enter title"
        />
        <Field
          name="body"
          type="textarea"
          validate={[required]}
          component={renderTextarea}
          label="Body"
          placeholder="Enter body text"
        />
        {error && <strong>{error}</strong>}
        <div>
          <Button
            type="submit"
            disabled={pristine || submitting}>
            Submit
          </Button>
          <Button
            type="button"
            disabled={pristine}
            onClick={reset}>
            Reset Values
          </Button>
        </div>
      </form>
      <Uploader />
    </div>
  );
};

const mapStateToProps = state => {
  if (state.posts.selectedPost.post) {
    const { id, links, attributes } = state.posts.selectedPost.post;
    return {
      id,
      links,
      initialValues: attributes,
    }
  }

  const { token } = state.auth;

  return {
    token,
  }
}

RemoteSubmitForm = reduxForm({
  form: 'remoteSubmit',
  onSubmit: postsActions.submitForm,
})(RemoteSubmitForm);


RemoteSubmitForm = connect(mapStateToProps)(RemoteSubmitForm)

export default RemoteSubmitForm;
