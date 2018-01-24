import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SUBMIT_MODAL_FORM,
} from './action-types';

const initialState = {
  modalType: null,
  id: null
}

export function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalType: action.payload.modalType,
        id: action.payload.id
      }

    case CLOSE_MODAL:
      return {
        ...state,
        modalType: null,
        modalData: null
      }

    case SUBMIT_MODAL_FORM:
      return state;

    default:
      return state;
  }
}
