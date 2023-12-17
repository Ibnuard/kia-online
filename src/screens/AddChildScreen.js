import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';
import {HelperText, RadioButton, Text, TextInput} from 'react-native-paper';
import {Colors, Scaler, Size} from '../styles';
import {FONT_SIZE_16} from '../styles/typography';
import {CustomButton, Gap} from '../components';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {addToDB, usersCollection} from '../utils/Database';
import {AuthContext, ModalContext} from '../context';
import ModalView from '../components/modal';

const AddChildScreen = () => {
  // Nav
  const navigation = useNavigation();
  const route = useRoute();

  const IS_UPDATE = route.params?.childId;
  const CHILD_DATA = IS_UPDATE ? route.params?.childData : null;

  const DATE = new Date(Date.parse(moment(CHILD_DATA?.date).format()));

  console.log(DATE);

  const [name, setName] = React.useState(IS_UPDATE ? CHILD_DATA?.name : '');
  const [sex, setSex] = React.useState(IS_UPDATE ? CHILD_DATA?.gender : 'male');
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [date, setDate] = React.useState(IS_UPDATE ? DATE : new Date());
  const [modalOk, setModalOk] = React.useState(false);
  const [inputError, setInputError] = React.useState('');

  // Stat
  const {user} = React.useContext(AuthContext);

  // Modal
  const {showModal, hideModal, changeModal, modalState} =
    React.useContext(ModalContext);

  const onChildAdd = async () => {
    if (name.length < 3) {
      setInputError('Nama minimal teridir dari 3 huruf!');
      return;
    }

    await showModal();

    if (IS_UPDATE) {
      try {
        usersCollection
          .doc(user?.phone)
          .collection('childs')
          .doc(IS_UPDATE)
          .update({
            name: name,
            gender: sex,
            date: String(date),
          })
          .then(async () => {
            setModalOk(true);
            await changeModal({
              type: 'popup',
              status: 'OK',
              message: 'Biodata berhasil diubah!',
            });
          });

        return;
      } catch (error) {
        setModalOk(false);
        await changeModal({
          type: 'popup',
          status: 'ERROR',
          message: 'Ada sesuatu yang tidak beres, silahkan coba lagi!',
        });

        return;
      }
    }

    try {
      usersCollection
        .doc(user?.phone)
        .collection('childs')
        .add({
          name: name,
          gender: sex,
          date: String(date),
          createdDate: moment().format(),
          alamat: user?.alamat,
        })
        .then(async () => {
          setModalOk(true);
          await changeModal({
            type: 'popup',
            status: 'OK',
            message: 'Biodata berhasil ditambahkan!',
          });
        });
    } catch (error) {
      console.log(error);
      setModalOk(false);
      await changeModal({
        type: 'popup',
        status: 'ERROR',
        message: 'Ada sesuatu yang tidak beres, silahkan coba lagi!',
      });
    }
  };

  return (
    <View style={styles.container}>
      <AppBar
        title={IS_UPDATE ? 'Ubah Biodata' : 'Buat Biodata Baru'}
        showBack={true}
      />
      <View style={styles.mainContainer}>
        <Text variant={'labelLarge'} style={styles.labelTitle}>
          Nama Lengkap
        </Text>
        <TextInput
          mode={'outlined'}
          placeholder="Masukan nama lengkap buah hati.."
          placeholderTextColor={Colors.COLOR_GREY}
          onChange={() => {
            setInputError('');
          }}
          onChangeText={te => setName(te)}
          value={name}
        />
        {inputError.length > 0 ? (
          <HelperText type={'error'}>Ini error</HelperText>
        ) : null}
        <Gap height={24} />
        <Text variant={'labelLarge'} style={styles.labelTitle}>
          Jenis Kelamin
        </Text>
        <View style={styles.radioRow}>
          <View style={styles.radioRow}>
            <RadioButton
              value="male"
              status={sex === 'male' ? 'checked' : 'unchecked'}
              onPress={() => setSex('male')}
            />
            <Text>Laki - laki</Text>
          </View>
          <Gap width={24} />
          <View style={styles.radioRow}>
            <RadioButton
              value="female"
              status={sex === 'female' ? 'checked' : 'unchecked'}
              onPress={() => setSex('female')}
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
        <CustomButton
          disabled={!name || inputError.length > 0}
          onPress={() => onChildAdd()}>
          {IS_UPDATE ? 'Simpan' : 'Tambahkan'}
        </CustomButton>
      </View>
      <DatePicker
        modal
        open={showDatePicker}
        mode={'date'}
        date={date}
        maximumDate={new Date()}
        onConfirm={date => {
          setShowDatePicker(false);
          setDate(date);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
      />
      <ModalView
        type={modalState.type}
        visible={modalState.visible}
        message={modalState.message}
        onPress={() => hideModal()}
        status={modalState?.status}
        onModalHide={() =>
          modalOk
            ? IS_UPDATE
              ? navigation.navigate('ChildList', {updated: true})
              : navigation.goBack()
            : null
        }
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
