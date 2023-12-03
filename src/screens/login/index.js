import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {ASSETS} from '../../utils/assetsLoader';
import {Colors, Scaler, Size} from '../../styles';
import {CustomButton, Gap} from '../../components';
import {FONT_SIZE_16} from '../../styles/typography';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.bgContainer}>
          <Image
            source={ASSETS.hero}
            style={styles.heroImg}
            resizeMode={'contain'}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text variant={'titleLarge'} style={styles.textTitle}>
          Halo! Selamat Datang Kembali
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
        />
        <Gap height={20} />
        <CustomButton>Masuk</CustomButton>
      </View>
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
    backgroundColor: Colors.COLOR_LIGHT_GRAY,
  },

  inputContainer: {
    backgroundColor: Colors.COLOR_WHITE,
    padding: Size.SIZE_24,
  },

  heroImg: {
    height: Scaler.scaleSize(380),
  },

  // text

  textTitle: {
    fontWeight: 'bold',
  },

  textBody: {
    color: Colors.COLOR_GREY,
    lineHeight: 24,
  },

  labelTitle: {
    fontSize: FONT_SIZE_16,
    marginBottom: Scaler.scaleSize(8),
  },
});
