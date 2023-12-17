import * as React from 'react';
import {View, Image, StatusBar} from 'react-native';
import {AuthContext} from '../../context';
import {retrieveData, storeData} from '../../utils/store';
import {wait} from '../../utils/utils';
import styles from './styles';
import {ASSETS} from '../../utils/assetsLoader';
import {Text} from 'react-native-paper';
import {Gap} from '../../components';
import messaging from '@react-native-firebase/messaging';

const SplashScreen = () => {
  const {restoreToken} = React.useContext(AuthContext);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let user;

      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();

      await storeData('FCM', token, false);

      try {
        user = await retrieveData('USER_SESSION', true);
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      restoreToken(user);
    };
    wait(2500).then(() => bootstrapAsync());
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={{position: 'absolute', width: '100%', height: '100%'}}>
        <Image
          source={ASSETS.splashBg}
          style={{height: '100%', width: '100%'}}
          resizeMode={'cover'}
        />
      </View>
      <Image source={ASSETS.logoLight} />
      <Gap height={24} />
      <Text style={styles.textTitle} variant={'titleLarge'}>
        Perkembangan Anak
      </Text>
    </View>
  );
};

export default SplashScreen;
