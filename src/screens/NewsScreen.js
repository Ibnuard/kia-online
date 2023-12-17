import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../styles';
import AppBar from '../components/AppBar';
import WebView from 'react-native-webview';
import {useRoute} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';

const NewsScreen = () => {
  const route = useRoute();

  const LINK = route?.params?.data?.link;

  return (
    <View style={styles.container}>
      <AppBar style={styles.appBar} showBack={true} title="" />
      <WebView
        source={{uri: LINK}}
        style={{flex: 1}}
        renderLoading={() => {
          return <ActivityIndicator />;
        }}
      />
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

  appBar: {
    backgroundColor: Colors.COLOR_BACKGROUND,
  },
});
