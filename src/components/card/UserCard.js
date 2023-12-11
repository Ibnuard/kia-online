import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {Colors, Size} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserCard = props => {
  return (
    <Card
      style={{...props.style, backgroundColor: Colors.COLOR_WHITE}}
      {...props}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.infoContainer}>
          <Avatar.Icon icon={'account'} size={48} />
          <View style={styles.contactContainer}>
            <Text style={styles.textName} variant={'labelLarge'}>
              {props?.user.name}
            </Text>
            <Text style={styles.textNo} variant={'labelSmall'}>
              {props?.user.phone}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => console.log('Edit pressed')}>
          <Icon name="circle-edit-outline" size={24} />
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
};

export default UserCard;

const styles = StyleSheet.create({
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
  },

  textNo: {
    color: Colors.COLOR_GREY,
  },
});
