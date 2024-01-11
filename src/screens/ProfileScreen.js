import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Size} from '../styles';
import AppBar from '../components/AppBar';
import {Avatar, Divider, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from '../components';
import {AuthContext} from '../context';
import {useNavigation} from '@react-navigation/native';
import {ASSETS} from '../utils/assetsLoader';

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
      <AppBar useBg={false} style={styles.appBar} title="Profile" />
      <View style={styles.mainContainer}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.COLOR_PRIMARY,
            alignItems: 'center',
            padding: Size.SIZE_24,
          }}>
          <View
            style={{
              position: 'absolute',
              right: 0,
            }}>
            <Image source={ASSETS.bgShadow} resizeMode={'cover'} />
          </View>
          <View style={styles.infoContainer}>
            <Avatar.Icon
              style={{backgroundColor: Colors.COLOR_WHITE}}
              icon={'account'}
              size={48}
            />
            <View style={styles.contactContainer}>
              <Text style={styles.textName} variant={'labelLarge'}>
                {user.name}
              </Text>
              <Text style={styles.textNo} variant={'labelSmall'}>
                {user.phone}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('EditProfile')}>
            <Icon
              name="circle-edit-outline"
              size={24}
              color={Colors.COLOR_WHITE}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
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
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

  appBar: {},

  mainContainer: {
    flex: 1,
  },

  bottomContainer: {
    padding: Size.SIZE_24,
  },

  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Size.SIZE_14,
  },

  userCard: {
    marginBottom: Size.SIZE_24,
    backgroundColor: 'transparent',
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

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  contactContainer: {
    paddingHorizontal: Size.SIZE_12,
  },

  // text

  textName: {
    fontWeight: 'bold',
    color: Colors.COLOR_WHITE,
  },

  textNo: {
    color: Colors.COLOR_WHITE,
  },
});
