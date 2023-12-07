import {Dimensions, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import {Colors, Scaler, Size} from '../../styles';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

const {width} = Dimensions.get('window');

const BeritaCard = ({data}) => {
  const {author, title, isoDate, image} = data;

  const formattedDate = moment(isoDate).format('DD MMMM YYYY');

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.cardThumb}
        source={{
          uri: image?.large,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.rightContent}>
        <Text variant={'labelSmall'}>{formattedDate}</Text>
        <Text
          numberOfLines={2}
          variant={'titleMedium'}
          style={styles.textTitle}>
          {title}
        </Text>
        <Text variant={'labelMedium'}>{author}</Text>
      </View>
    </View>
  );
};

export default BeritaCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },

  cardThumb: {
    height: Scaler.scaleSize(72),
    width: Scaler.scaleSize(72),
    backgroundColor: Colors.COLOR_GREY,
    borderRadius: 8,
    marginRight: Size.SIZE_10,
  },

  rightContent: {
    width: '70%',
  },

  // text

  textTitle: {
    fontWeight: 'bold',
  },
});
