import {Image, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {Text, TextInput} from 'react-native-paper';
import {ASSETS} from '../utils/assetsLoader';
import {Colors, Scaler, Size} from '../styles';
import {CustomButton, Gap} from '../components';
import {FONT_SIZE_16} from '../styles/typography';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {AuthContext, ModalContext} from '../context';
import {getDBdata, isDBPathExist} from '../utils/Database';
import ModalView from '../components/modal';

const LoginScreen = () => {
  const [phone, setPhone] = React.useState();

  const navigation = useNavigation();

  const {signIn} = React.useContext(AuthContext);
  const {showModal, changeModal, hideModal, modalState} =
    React.useContext(ModalContext);

  const onLogin = async () => {
    showModal({type: 'loading'});
    const isUserExist = await isDBPathExist(`Users/${phone}`);

    if (isUserExist) {
      hideModal();
      try {
        const user = (await getDBdata(`Users/${phone}`)).data();
        if (user) {
          signIn(user);
        }
        console.log(user);
      } catch (error) {
        console.log(error);
      }
    } else {
      changeModal({type: 'popup', message: 'User tidak ditemukan!'});
      console.log('Users not found');
    }
  };

  console.log(modalState);

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

          <Text variant={'titleSmall'} style={styles.textLoginAdmin}>
            Masuk sebagai admin
          </Text>
          <Icon name={'arrowright'} size={18} color={Colors.COLOR_PRIMARY} />
        </View>
        <View style={styles.bgContainer}>
          <Image source={ASSETS.hero} style={styles.heroImg} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text variant={'titleLarge'} style={styles.textTitle}>
          Halo! Selamat datang kembali
        </Text>
        <Text variant={'bodyMedium'} style={styles.textBody}>
          Masukan nomor telepon yang sudah terdaftar untuk masuk ke halaman
          utama
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
        />
        <Gap height={20} />
        <CustomButton disabled={!phone} onPress={() => onLogin()}>
          Masuk
        </CustomButton>
        <Gap height={28} />
        <View style={styles.bottomContainer}>
          <Text variant={'bodyMedium'}>Belum pernah mendaftar?</Text>
          <Text
            variant={'bodyMedium'}
            style={styles.textLink}
            onPress={() => navigation.navigate('SignUp')}>
            Daftar
          </Text>
        </View>
      </View>
      <ModalView
        visible={modalState.visible}
        type={modalState.type}
        message={modalState.message}
        onPress={() => hideModal()}
      />
    </View>
  );
};

export default LoginScreen;

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

  bgContainer: {},

  heroImg: {
    alignSelf: 'center',
    height: '100%',
    width: Scaler.scaleSize(220),
    marginTop: 10,
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
    height: 50,
    width: 100,
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
