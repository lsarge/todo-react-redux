import {
  UPLOAD_COMPLETE,
} from './action-types';

export const onFinish = (data) => {
  console.log('data on finish in the action', data);
  return {
    type: UPLOAD_COMPLETE,
    payload: data,
  }
}
