import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Size} from '../styles';
import AppBar from '../components/AppBar';
import {Divider, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from '../components';
import {AuthContext} from '../context';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const {signOut, user} = React.useContext(AuthContext);

  // Nav
  const navigation = useNavigation();

  const MENUS = [
    user.role == 'user'
      ? {
          icon: 'emoticon-happy-outline',
          title: 'Biodata Anak',
          to: () => navigation.navigate('ChildList'),
        }
      : undefined,
    {
      icon: 'information-outline',
      title: 'Informasi dan Bantuan',
      to: () => navigation.navigate('Help'),
    },
    {
      icon: 'phone-outline',
      title: 'Nomor Gawat Darurat Nasional',
      to: () => navigation.navigate('CallCenter'),
    },
    {
      icon: 'exit-to-app',
      title: 'Keluar',
      to: () => signOut(),
    },
  ].filter(Boolean);

  return (
    <View style={styles.container}>
      <AppBar style={styles.appBar} title="Profile" />
      <View style={styles.mainContainer}>
        <Card.UserCard
          user={user}
          style={styles.userCard}
          onEditPress={() => navigation.navigate('EditProfile')}
        />
        <Text style={styles.textSubtitle} variant={'titleLarge'}>
          Preferensi
        </Text>
        {MENUS.map((item, index) => {
          return (
            <View key={item + index}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.menuRow}
                onPress={item.to}>
                <Icon name={item.icon} size={24} />
                <Text style={styles.textMenu} variant={'labelMedium'}>
                  {item.title}
                </Text>
              </TouchableOpacity>
              {index != MENUS.length - 1 && <Divider />}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

  appBar: {
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

  mainContainer: {
    flex: 1,
    padding: Size.SIZE_24,
  },

  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Size.SIZE_14,
  },

  userCard: {
    marginBottom: Size.SIZE_24,
    backgroundColor: Colors.COLOR_WHITE,
  },

  // text

  textSubtitle: {
    fontWeight: 'bold',
    marginBottom: Size.SIZE_14,
  },

  textMenu: {
    color: Colors.COLOR_GREY,
    marginLeft: Size.SIZE_14,
  },
});
