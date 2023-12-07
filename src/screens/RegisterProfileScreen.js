import {
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';
import {Text, TextInput} from 'react-native-paper';
import {Colors, Scaler, Size} from '../styles';
import {FONT_SIZE_16} from '../styles/typography';
import {CustomButton, Gap} from '../components';
import {useNavigation} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import {AuthContext} from '../context';

const RegisterProfileScreen = () => {
  const {signIn} = React.useContext(AuthContext);

  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      style={styles.container}
      onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
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
          />
          <Gap height={24} />
          <Text variant={'labelLarge'} style={styles.labelTitle}>
            Email
          </Text>
          <TextInput
            mode={'outlined'}
            placeholder="Masukan emailmu disini..."
            placeholderTextColor={Colors.COLOR_GREY}
          />
          <Gap height={24} />
          <Text variant={'labelLarge'} style={styles.labelTitle}>
            Nomor Telpon
          </Text>
          <TextInput
            mode={'outlined'}
            placeholder="Masukan nama lengkapmu disini..."
            placeholderTextColor={Colors.COLOR_GREY}
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
          />
        </View>
        <View style={styles.bottomContainer}>
          <CustomButton onPress={() => signIn()}>Daftar</CustomButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
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
