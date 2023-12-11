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
import {AuthContext} from '../context';
import {addToDB} from '../utils/Database';

const RegisterProfileScreen = () => {
  // initial stat
  const {signIn} = React.useContext(AuthContext);

  const navigation = useNavigation();
  const route = useRoute();

  const PHONE = route?.params?.phone;

  // state
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [phone, setPhone] = React.useState(PHONE);
  const [alamat, setAlamat] = React.useState();

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

    try {
      const data = {
        name: name,
        email: email,
        phone: phone,
        alamat: alamat,
      };

      await addToDB(`Users/${phone}`, data).then(() => {
        signIn();
      });
    } catch (error) {
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
        <AppBar title="Lengkapi Profile" />
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
            Daftar
          </CustomButton>
        </View>
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
