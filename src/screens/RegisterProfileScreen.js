import {
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';
import {HelperText, Text, TextInput} from 'react-native-paper';
import {Colors, Scaler, Size} from '../styles';
import {FONT_SIZE_16} from '../styles/typography';
import {CustomButton, Gap} from '../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import {AuthContext, ModalContext} from '../context';
import {addToDB, updateDB} from '../utils/Database';
import ModalView from '../components/modal';

const RegisterProfileScreen = () => {
  // initial stat
  const {user, signIn} = React.useContext(AuthContext);

  // Nav
  const navigation = useNavigation();
  const route = useRoute();

  const PHONE = route?.params?.phone;
  const ROUTE_NAME = route?.name;

  const IS_EDIT = ROUTE_NAME == 'EditProfile';

  // Modal
  // Modal
  const {showModal, hideModal, changeModal, modalState} =
    React.useContext(ModalContext);

  // state
  const [name, setName] = React.useState(IS_EDIT ? user?.name : '');
  const [email, setEmail] = React.useState(IS_EDIT ? user?.email : '');
  const [phone, setPhone] = React.useState(IS_EDIT ? user?.phone : PHONE);
  const [alamat, setAlamat] = React.useState(IS_EDIT ? user?.alamat : '');

  // modal ok type
  const [modalOkType, setModalOkType] = React.useState('positive');

  const [errorInput, setErrorInput] = React.useState({
    name: null,
    email: null,
    alamat: null,
  });

  const onRegister = async () => {
    setErrorInput({
      name: null,
      email: null,
      alamat: null,
    });

    if (name.length < 3) {
      console.log('NAMA ERROR');
      setErrorInput({
        ...errorInput,
        name: 'Nama minimal terdiri dari 3 huruf.',
      });
      return;
    }

    if (!email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi)) {
      console.log('EMAIL ERROR');
      setErrorInput({...errorInput, email: 'Email tidak valid.'});

      return;
    }

    // norm address
    const al = alamat.trim();

    if (al.length < 3) {
      console.log('ALAMAT ERROR');
      setErrorInput({...errorInput, alamat: 'Alamat tidak valid.'});
      return;
    }

    await showModal({type: 'loading'});

    // IS EDIT ROUTE
    if (IS_EDIT) {
      try {
        updateDB(`Users/${phone}`, {
          name: name,
          alamat: alamat,
          email: email,
        }).then(async () => {
          setModalOkType('positive');
          await changeModal({
            type: 'popup',
            message: 'Data berhasil diubah!',
          });
        });
        return;
      } catch (error) {
        setModalOkType('negative');
        await changeModal({
          type: 'popup',
          message: 'Ada sesuatu yang tidak beres, silahkan coba lagi nanti!',
        });
        return;
      }
    }

    try {
      const data = {
        name: name,
        email: email,
        phone: phone,
        alamat: al,
        role: 'user',
      };

      await addToDB(`Users/${phone}`, data).then(async () => {
        setModalOkType('positive');
        await changeModal({
          type: 'popup',
          message: 'Pendaftaran berhasil, silahkan login!',
        });
      });
    } catch (error) {
      setModalOkType('negative');
      await changeModal({
        type: 'popup',
        message: 'Ada sesuatu yang tidak beres, silahkan coba lagi nanti!',
      });
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => Keyboard.dismiss()}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}>
        <StatusBar
          backgroundColor={Colors.COLOR_WHITE}
          barStyle={'dark-content'}
        />
        <AppBar
          showBack={IS_EDIT}
          title={IS_EDIT ? 'Ubah Profile' : 'Lengkapi Profile'}
        />
        <View style={styles.mainContainer}>
          <Text variant={'labelLarge'} style={styles.labelTitle}>
            Nama Lengkap
          </Text>
          <TextInput
            mode={'outlined'}
            placeholder="Masukan nama lengkapmu disini..."
            placeholderTextColor={Colors.COLOR_GREY}
            onChange={() => {
              setErrorInput({name: null});
            }}
            onChangeText={te => setName(te)}
            value={name}
          />
          {errorInput.name && (
            <HelperText type={'error'}>{errorInput.name}</HelperText>
          )}
          <Gap height={24} />
          <Text variant={'labelLarge'} style={styles.labelTitle}>
            Email
          </Text>
          <TextInput
            mode={'outlined'}
            placeholder="Masukan emailmu disini..."
            placeholderTextColor={Colors.COLOR_GREY}
            onChange={() => {
              setErrorInput({email: null});
            }}
            onChangeText={te => setEmail(te)}
            value={email}
          />
          {errorInput.email && (
            <HelperText type={'error'}>{errorInput.email}</HelperText>
          )}
          <Gap height={24} />
          <Text variant={'labelLarge'} style={styles.labelTitle}>
            Nomor Telpon
          </Text>
          <TextInput
            mode={'outlined'}
            placeholder="Masukan nomor kamu disini..."
            placeholderTextColor={Colors.COLOR_GREY}
            editable={false}
            value={phone}
          />
          <Gap height={24} />
          <Text variant={'labelLarge'} style={styles.labelTitle}>
            Alamat
          </Text>
          <TextInput
            style={styles.addressInput}
            multiline
            mode={'outlined'}
            placeholder="Masukan alamatmu disini..."
            placeholderTextColor={Colors.COLOR_GREY}
            onChange={() => {
              setErrorInput({alamat: null});
            }}
            onChangeText={te => setAlamat(te)}
            value={alamat}
          />
          {errorInput.alamat && (
            <HelperText type={'error'}>{errorInput.alamat}</HelperText>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <CustomButton
            disabled={!name || !email || !alamat}
            onPress={() => onRegister()}>
            {IS_EDIT ? 'Simpan' : 'Daftar'}
          </CustomButton>
        </View>
        <ModalView
          type={modalState.type}
          visible={modalState.visible}
          message={modalState.message}
          onPress={() => hideModal()}
          onModalHide={() =>
            modalOkType == 'positive'
              ? IS_EDIT
                ? (signIn({
                    name: name,
                    email: email,
                    alamat: alamat,
                    phone: phone,
                  }),
                  navigation.goBack())
                : navigation.navigate('SignIn')
              : null
          }
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },

  scrollContent: {
    flexGrow: 1,
  },

  mainContainer: {
    padding: Size.SIZE_24,
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Size.SIZE_24,
  },

  addressInput: {
    height: Scaler.scaleSize(120),
    textAlignVertical: 'top',
    lineHeight: 24,
  },

  // text

  labelTitle: {
    fontSize: FONT_SIZE_16,
    marginBottom: Scaler.scaleSize(8),
    color: Colors.COLOR_BLACK,
    fontWeight: 'bold',
  },
});
