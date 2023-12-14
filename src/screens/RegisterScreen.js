import {Image, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {ASSETS} from '../utils/assetsLoader';
import {Colors, Scaler, Size} from '../styles';
import {CustomButton, Gap} from '../components';
import {FONT_SIZE_16} from '../styles/typography';
import {useNavigation, useRoute} from '@react-navigation/native';
import {addToDB, isDBPathExist} from '../utils/Database';
import ModalView from '../components/modal';
import {ModalContext, RoleContext} from '../context';

const RegisterScreen = () => {
  const [phone, setPhone] = React.useState();

  // Modal
  const {showModal, hideModal, changeModal, modalState} =
    React.useContext(ModalContext);

  // Nav
  const navigation = useNavigation();

  // stat
  const {role} = React.useContext(RoleContext);

  console.log('role - > ' + role);

  // FUNCTIONAL
  const onRegisterPressed = async () => {
    await showModal({type: 'loading'});
    const ROLE_PATH = role == 'user' ? 'Users' : 'Admins';
    const isUserExist = await isDBPathExist(`${ROLE_PATH}/${phone}`);

    if (!isUserExist) {
      await hideModal();
      navigation.navigate('SignUpProfile', {
        phone: phone,
      });
    } else {
      await showModal({
        type: 'popup',
        message: 'User sudah terdaftar, silahkan login!',
      });
      console.log('User exist');
    }
  };

  // RENDER FUNC

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.COLOR_BACKGROUND}
        barStyle={'dark-content'}
      />
      <View style={styles.topContainer}>
        <View style={styles.topContent}>
          <View style={styles.topLogo}>
            <Image
              source={ASSETS.logo}
              style={styles.logo}
              resizeMode={'contain'}
            />
          </View>
        </View>
        <View style={styles.bgContainer}>
          <Image
            source={ASSETS.hero[role][1]}
            style={styles.heroImg}
            resizeMode={'contain'}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text variant={'titleLarge'} style={styles.textTitle}>
          Daftar untuk melanjutkan
        </Text>
        <Text variant={'bodyMedium'} style={styles.textBody}>
          Masukan nomor telepon yang ingin didaftarkan untuk lanjut masuk ke
          halaman utaman
        </Text>
        <Gap height={24} />
        <Text variant={'labelLarge'} style={styles.labelTitle}>
          Nomor Telpon
        </Text>
        <TextInput
          mode={'outlined'}
          placeholder="Masukan nomor telponmu disini..."
          placeholderTextColor={Colors.COLOR_GREY}
          onChangeText={te => setPhone(te)}
          value={phone}
          keyboardType={'phone-pad'}
        />
        <Gap height={20} />
        <CustomButton disabled={!phone} onPress={() => onRegisterPressed()}>
          Daftar
        </CustomButton>
        <Gap height={28} />
        <View style={styles.bottomContainer}>
          <Text variant={'bodyMedium'}>Sudah punya akun?</Text>
          <Text
            variant={'bodyMedium'}
            style={styles.textLink}
            onPress={() => navigation.navigate('SignIn')}>
            Masuk
          </Text>
        </View>
      </View>
      <ModalView
        type={modalState.type}
        visible={modalState.visible}
        message={modalState.message}
        onPress={() => hideModal()}
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topContainer: {
    flex: 1,
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

  inputContainer: {
    borderTopWidth: 1,
    borderColor: Colors.COLOR_LIGHT_GRAY,
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_24,
  },

  heroImg: {
    alignSelf: 'center',
    height: '100%',
    width: Scaler.scaleSize(420),
    marginTop: Scaler.scaleSize(48),
  },

  topLogo: {
    flex: 1,
  },

  topContent: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Size.SIZE_24,
    paddingVertical: Size.SIZE_8,
  },

  logo: {
    height: 40,
    width: 40,
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  // text

  textTitle: {
    fontSize: Scaler.scaleFont(20),
    fontWeight: 'bold',
    marginBottom: 8,
  },

  textBody: {
    color: Colors.COLOR_GREY,
    lineHeight: 24,
  },

  labelTitle: {
    fontSize: FONT_SIZE_16,
    marginBottom: Scaler.scaleSize(8),
    color: Colors.COLOR_BLACK,
    fontWeight: 'bold',
  },

  textLoginAdmin: {
    color: Colors.COLOR_PRIMARY,
    paddingHorizontal: 8,
  },

  textLink: {
    color: Colors.COLOR_BLACK,
    fontWeight: 'bold',
    marginHorizontal: 4,
    paddingHorizontal: 2,
  },
});
