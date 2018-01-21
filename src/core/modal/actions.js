import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from './action-types';


export function openModal(post) {
  return {
    type: OPEN_MODAL,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}
