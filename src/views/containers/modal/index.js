import React from 'react';
import { connect } from 'react-redux';
import postFormModal from './postFormModal'
import { modalActions }  from 'src/core/modal';

const MODAL_COMPONENTS = {
  'POST_FORM': postFormModal,
  // 'CONFIRM_LOGOUT': ConfirmLogoutModal,
}

const ModalRoot = (props) => {
  const { modalType, modalData, children, closeModal } = props;
  if (!modalType) {
    return <span /> // after React v15 you can return null here
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return <SpecificModal  closeModal={closeModal} />
}

const mapDispatchToProps = Object.assign({},
  modalActions
)

export default connect(
  state => state.modal,
  mapDispatchToProps
)(ModalRoot)
