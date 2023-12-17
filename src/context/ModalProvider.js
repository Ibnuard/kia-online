import * as React from 'react';
import {ModalContext} from '.';
import ModalView from '../components/modal';

export const ModalProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SHOW_MODAL':
          return {
            ...prevState,
            visible: true,
            modalType: action.modalType || 'loading',
            message: action.message || '',
            status: action.status,
            title: action.title,
          };
          break;
        case 'CHANGE_MODAL':
          return {
            ...prevState,
            modalType: action.modalType,
            message: action.message || '',
            status: action.status,
            title: action.title,
          };
          break;
        case 'HIDE_MODAL':
          return {
            ...prevState,
            visible: false,
          };
          break;
      }
    },
    {
      visible: false,
      modalType: 'loading',
      message: '',
      status: 'OK',
      title: '',
    },
  );

  const modalContext = React.useMemo(
    () => ({
      showModal: ms => {
        dispatch({
          type: 'SHOW_MODAL',
          visible: true,
          modalType: ms?.type || 'loading',
          message: ms?.message || '',
          status: ms?.status,
          title: ms?.title,
        });
      },
      changeModal: ms => {
        dispatch({
          type: 'CHANGE_MODAL',
          visible: true,
          modalType: ms?.type,
          message: ms?.message || '',
          status: ms?.status,
          title: ms?.title,
        });
      },
      hideModal: ms => {
        dispatch({
          type: 'HIDE_MODAL',
          visible: false,
          message: '',
          title: '',
          status: 'OK',
        });
      },
      modalState: {
        visible: state.visible,
        type: state.modalType,
        message: state.message,
        status: state.status,
        title: state.title,
      },
    }),
    [state],
  );

  return (
    <ModalContext.Provider value={modalContext}>
      {children}
    </ModalContext.Provider>
  );
};
