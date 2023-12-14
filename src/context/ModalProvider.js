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
          };
          break;
        case 'CHANGE_MODAL':
          return {
            ...prevState,
            modalType: action.modalType,
            message: action.message || '',
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
        });
      },
      changeModal: ms => {
        dispatch({
          type: 'CHANGE_MODAL',
          visible: true,
          modalType: ms?.type,
          message: ms?.message || '',
        });
      },
      hideModal: ms => {
        dispatch({
          type: 'HIDE_MODAL',
          visible: false,
        });
      },
      modalState: {
        visible: state.visible,
        type: state.modalType,
        message: state.message,
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
