import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';
import {RadioButton, Text, TextInput} from 'react-native-paper';
import {Colors, Scaler, Size} from '../styles';
import {FONT_SIZE_16} from '../styles/typography';
import {CustomButton, Gap} from '../components';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const AddChildScreen = () => {
  const [sex, setSex] = React.useState('first');
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AppBar title="" showBack={true} />
      <View style={styles.mainContainer}>
        <Text variant={'titleLarge'} style={styles.textTitle}>
          Daftar imunisasi untuk mendapatkan nomor antrian
        </Text>
        <Gap height={24} />
        <Text variant={'labelLarge'} style={styles.labelTitle}>
          Nama Lengkap
        </Text>
        <TextInput
          mode={'outlined'}
          placeholder="Masukan nama lengkap buah hati.."
          placeholderTextColor={Colors.COLOR_GREY}
        />
        <Gap height={24} />
        <Text variant={'labelLarge'} style={styles.labelTitle}>
          Jenis Kelamin
        </Text>
        <View style={styles.radioRow}>
          <View style={styles.radioRow}>
            <RadioButton
              value="male"
              status={sex === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
            />
            <Text>Laki - laki</Text>
          </View>
          <Gap width={24} />
          <View style={styles.radioRow}>
            <RadioButton
              value="female"
              status={sex === 'second' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('second')}
            />
            <Text>Prempuan</Text>
          </View>
        </View>
        <Gap height={24} />
        <Text variant={'labelLarge'} style={styles.labelTitle}>
          Tanggal Lahir
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowDatePicker(true)}>
          <TextInput
            mode={'outlined'}
            editable={false}
            placeholder="Masukan nama lengkap buah hati.."
            placeholderTextColor={Colors.COLOR_GREY}
            value={moment(date).format('DD/MM/YYYY')}
            right={<TextInput.Icon icon={'calendar-range'} />}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <CustomButton onPress={() => navigation.goBack()}>
          Tambahkan
        </CustomButton>
      </View>
      <DatePicker
        modal
        open={showDatePicker}
        mode={'date'}
        date={date}
        onConfirm={date => {
          setShowDatePicker(false);
          setDate(date);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
      />
    </View>
  );
};

export default AddChildScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },

  mainContainer: {
    padding: Size.SIZE_24,
  },

  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Size.SIZE_24,
  },

  // text

  textTitle: {
    fontWeight: 'bold',
  },

  labelTitle: {
    fontSize: FONT_SIZE_16,
    marginBottom: Scaler.scaleSize(8),
    color: Colors.COLOR_BLACK,
    fontWeight: 'bold',
  },
});
