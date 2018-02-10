import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactS3Uploader from 'react-s3-uploader';
import { uploaderActions } from 'src/core/uploader'


const getSignedUrl = (file, callback) => {
  const formData = new FormData();
  let params = {}

  formData.append('objectName', file.name);
  formData.append('contentType', file.type);

  params = {
    method: 'POST',
    body: formData,
  };

  fetch('http://localhost:4000/api/v1/s3/', params )
    .then(function(response) {
      return response.json();
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => console.log('error', error));
}


export class Uploader extends Component {
  static propTypes = {
    onFinish: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.onFinish = ::this.onFinish;
  }

  onFinish(data) {
    this.props.onFinish(data);
  }

  render() {
    const { publicUrl } = this.props.uploader;

    return (
      <div>
        <ReactS3Uploader
          getSignedUrl={getSignedUrl}
          onFinish={this.onFinish}
          accept="image/*"
          uploadRequestHeaders={{
            'x-amz-acl': 'public-read'
          }}
          contentDisposition="auto"
        />

        { publicUrl && <img src={ publicUrl } /> }

      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return { uploader: state.uploader };
};

const mapDispatchToProps = Object.assign(
  {},
  uploaderActions,
);

export default connect(mapStateToProps, mapDispatchToProps)(Uploader)
