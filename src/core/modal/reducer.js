import {
  OPEN_MODAL,
  CLOSE_MODAL
} from './action-types';

const initialState = {
  modalType: null,
  modalProps: {}
}

export function modalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps
    }
    case CLOSE_MODAL:
      return state;

    default:
      return state;
  }
}
