import * as React from 'react';
import Modal from 'react-native-modal';
import ModalLoading from './type/loading';
import styles from './styles';
import ModalPopUp from './type/popup';

const ModalView = ({
  children,
  visible = false,
  type,
  onPress,
  onModalHide,
  message,
  status,
  title,
}) => {
  //render modal children
  const renderContent = () => {
    switch (type) {
      case 'loading':
        return <ModalLoading />;
        break;
      case 'popup':
        return (
          <ModalPopUp
            status={status}
            message={message}
            onButtonPress={onPress}
            title={title}
          />
        );
        break;
      default:
        return children;
        break;
    }
  };

  return (
    <Modal
      isVisible={visible}
      useNativeDriver
      style={styles.container}
      onModalHide={onModalHide}>
      {renderContent()}
    </Modal>
  );
};

export default ModalView;
