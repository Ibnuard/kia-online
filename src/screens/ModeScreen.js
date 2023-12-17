import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Avatar, Card, RadioButton, Text} from 'react-native-paper';
import {ASSETS} from '../utils/assetsLoader';
import {Colors, Scaler, Size} from '../styles';
import {CustomButton, Gap} from '../components';
import {useNavigation} from '@react-navigation/native';
import {RoleContext} from '../context';

const ModeScreen = () => {
  const [role, setRole] = React.useState('user');

  // nav
  const navigation = useNavigation();

  // stat
  const {selectRole} = React.useContext(RoleContext);

  return (
    <View style={styles.container}>
      <Image source={ASSETS.logo} style={styles.logo} />
      <Text variant={'titleLarge'} style={styles.textTitle}>
        Selamat datang di Perkembangan Anak
      </Text>
      <Text variant={'labelMedium'} style={styles.textSubtitle}>
        Daftar dan buat jadwal imunisasi untuk si buah hati
      </Text>
      <View style={styles.rowContent}>
        <Card style={styles.cardContainer} onPress={() => setRole('user')}>
          <Card.Content style={styles.cardContent}>
            <Avatar.Image source={ASSETS.mode.user} />
            <Gap height={12} />
            <Text style={styles.textTitle}>Pengguna</Text>
            <Gap height={4} />
            <Text style={styles.textDesc}>Daftarkan buah hati anda disini</Text>
            <Gap height={14} />
            <RadioButton
              value="user"
              status={role === 'user' ? 'checked' : 'unchecked'}
              onPress={() => setRole('user')}
            />
          </Card.Content>
        </Card>
        <Card style={styles.cardContainer} onPress={() => setRole('admin')}>
          <Card.Content style={styles.cardContent}>
            <Avatar.Image source={ASSETS.mode.admin} />
            <Gap height={12} />
            <Text style={styles.textTitle}>Admin</Text>
            <Gap height={4} />
            <Text style={styles.textDesc}>Kelola posyandu disini</Text>
            <Gap height={14} />
            <RadioButton
              value="admin"
              status={role === 'admin' ? 'checked' : 'unchecked'}
              onPress={() => setRole('admin')}
            />
          </Card.Content>
        </Card>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={() => {
            selectRole(role);
            navigation.navigate('SignIn');
          }}>
          Lanjut
        </CustomButton>
      </View>
    </View>
  );
};

export default ModeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Size.SIZE_24,
  },

  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Size.SIZE_24,
  },

  cardContainer: {
    flex: 1,
    height: '100%',
    marginHorizontal: Size.SIZE_8,
  },

  cardContent: {
    alignItems: 'center',
  },

  logo: {
    width: Scaler.scaleSize(42),
    height: Scaler.scaleSize(42),
    marginBottom: Size.SIZE_14,
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: Size.SIZE_24,
  },

  // text

  textTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textSubtitle: {
    color: Colors.COLOR_GREY,
    paddingVertical: Size.SIZE_8,
  },

  textDesc: {
    textAlign: 'center',
    height: Scaler.scaleSize(54),
  },
});
