import {
  UPLOAD_COMPLETE,
} from './action-types';

const uploads = (state = {}, action) => {
  console.log('action payload', action);

  switch (action.type) {
    case UPLOAD_COMPLETE:
    return {
      ...state,
      publicUrl: action.payload.public_url
    }

    default:
      return state;
  }
}

export default uploads;
