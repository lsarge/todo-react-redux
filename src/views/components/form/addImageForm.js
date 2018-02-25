import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'react-mdl';
import { postsActions } from 'src/core/posts'
import Dropzone from 'react-dropzone';


const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}


let AddImageForm = props => {
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

  return (
    <form onSubmit={handleSubmit }>
      <div>
        <label htmlFor='upload'>Files</label>
        <Field
          name='upload'
          component={renderDropzoneInput}
        />
      </div>
      <div>
        <button type="submit">
          Submit
        </button>
        <button onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = state => {
  const { token } = state.auth;

  if (state.posts.selectedPost.post) {
    const { id, title, content } = state.posts.selectedPost.post;
    return {
      id,
      initialValues: {
        title,
        content,
      },
      token,
    }
  }

  return {
    token,
  }
}

AddImageForm = reduxForm({
  form: 'addImage',
  onSubmit: postsActions.submitUploadForm,
})(AddImageForm);


AddImageForm = connect(mapStateToProps)(AddImageForm)

export default AddImageForm;
