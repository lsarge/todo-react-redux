import React from 'react';
import { connect } from 'react-redux';
import editPost from './editPost'
import { modalActions }  from 'src/core/modal';
// import DeletePostModal from './DeletePostModal'
// import ConfirmLogoutModal from './ConfirmLogoutModal'

const MODAL_COMPONENTS = {
  'EDIT_MODAL': editPost,
  // 'CONFIRM_LOGOUT': ConfirmLogoutModal,
  /* other modals */
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
