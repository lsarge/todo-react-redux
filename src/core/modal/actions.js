import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SUBMIT_MODAL_FORM,
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

export function submitModalForm() {
  return {
    type: SUBMIT_MODAL_FORM
  };
}
