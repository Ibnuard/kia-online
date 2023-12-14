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
import {addToDB, imunisasiCollection, usersCollection} from '../utils/Database';
import {AuthContext, ModalContext} from '../context';
import ModalView from '../components/modal';

const AddJadwalScreen = () => {
  // Nav
  const navigation = useNavigation();
  const route = useRoute();

  // Stat
  const {user} = React.useContext(AuthContext);

  const IMUNISASI = route.params?.data;

  const IS_UPDATE = route?.params?.isUpdate;

  const DATE = new Date(Date.parse(moment(IMUNISASI?.jadwal).format()));

  const [name, setName] = React.useState(IMUNISASI?.name);
  const [alamat, setAlamat] = React.useState(
    IS_UPDATE ? IMUNISASI?.alamat : user?.alamat,
  );
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [date, setDate] = React.useState(IS_UPDATE ? DATE : new Date());
  const [modalOk, setModalOk] = React.useState(false);
  const [inputError, setInputError] = React.useState('');

  // Modal
  const {showModal, hideModal, changeModal, modalState} =
    React.useContext(ModalContext);

  const onChildAdd = async () => {
    if (alamat.length < 3) {
      setInputError('Alamat tidak valid!');
      return;
    }

    await showModal({type: 'loading'});

    if (IS_UPDATE) {
      try {
        imunisasiCollection
          .doc(IMUNISASI.id)
          .update({
            name: name,
            jadwal: moment(date).format(),
            alamat: alamat,
            formatedJadwal: moment(date).format('DD MMMM YYYY'),
          })
          .then(async () => {
            setModalOk(true);
            await changeModal({
              type: 'popup',
              message: 'Jadwal berhasil diubah!',
            });
          });
        return;
      } catch (error) {
        console.log(error);
        setModalOk(false);
        await changeModal({
          type: 'popup',
          message: 'Ada sesuatu yang tidak beres, silahkan coba lagi!',
        });

        return;
      }
    }

    const data = {
      kode: IMUNISASI?.category,
      name: name,
      jadwal: moment(date).format(),
      formatedJadwal: moment(date).format('DD MMMM YYYY'),
      alamat: alamat,
      createdDate: moment().format(),
    };

    try {
      await imunisasiCollection.add(data).then(async () => {
        setModalOk(true);
        await changeModal({type: 'popup', message: 'Jadwal berhasil dibuat!'});
      });
    } catch (error) {
      console.log(error);
      setModalOk(false);
      await changeModal({
        type: 'popup',
        message: 'Ada sesuatu yang tidak beres, silahkan coba lagi!',
      });
    }
  };

  return (
    <View style={styles.container}>
      <AppBar
        title={IS_UPDATE ? 'Ubah Jadwal Imunisasi' : 'Buat Jadwal Baru'}
        showBack={true}
      />
      <View style={styles.mainContainer}>
        <Text variant={'labelLarge'} style={styles.labelTitle}>
          Nama Program Imunisasi
        </Text>
        <TextInput
          editable={false}
          mode={'outlined'}
          placeholder="Masukan nama lengkap buah hati.."
          placeholderTextColor={Colors.COLOR_GREY}
          onChange={() => {
            setInputError('');
          }}
          onChangeText={te => setName(te)}
          value={name}
        />
        <Gap height={24} />
        <Text variant={'labelLarge'} style={styles.labelTitle}>
          Tanggal Pelaksanaan
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
        <Gap height={24} />
        <Text variant={'labelLarge'} style={styles.labelTitle}>
          Lokasi Imunisasi
        </Text>
        <TextInput
          mode={'outlined'}
          placeholder="Masukan lokasi imunisasi..."
          placeholderTextColor={Colors.COLOR_GREY}
          onChange={() => {
            setInputError('');
          }}
          onChangeText={te => setAlamat(te)}
          value={alamat}
        />
        {inputError.length > 0 ? (
          <HelperText type={'error'}>{inputError}</HelperText>
        ) : null}
      </View>
      <View style={styles.bottomContainer}>
        <CustomButton
          disabled={!name || inputError.length > 0}
          onPress={() => onChildAdd()}>
          {'Simpan'}
        </CustomButton>
      </View>
      <DatePicker
        modal
        open={showDatePicker}
        mode={'date'}
        date={date}
        minimumDate={new Date()}
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
        onModalHide={() => (modalOk ? navigation.goBack() : null)}
      />
    </View>
  );
};

export default AddJadwalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },

  mainContainer: {
    flex: 1,
    padding: Size.SIZE_24,
  },

  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bottomContainer: {
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
