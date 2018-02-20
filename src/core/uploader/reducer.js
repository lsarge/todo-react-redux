import {
  UPLOAD_COMPLETE,
} from './action-types';

const uploads = (state = {}, action) => {
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
