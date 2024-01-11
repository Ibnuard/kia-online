import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';
import {Colors, Scaler, Size} from '../styles';
import {Card as CustomCard, CustomButton, Gap} from '../components';
import {
  Card,
  Divider,
  HelperText,
  List,
  Text,
  TextInput,
} from 'react-native-paper';
import {BarChart, LineChart} from 'react-native-gifted-charts';
import {FONT_SIZE_16} from '../styles/typography';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import {hitungUmur, sendNotification} from '../utils/utils';
import {
  historyCollection,
  imunisasiCollection,
  usersCollection,
} from '../utils/Database';
import {ModalContext} from '../context';
import ModalView from '../components/modal';

const ImunisasiScreen = () => {
  const [tb, setTB] = React.useState();
  const [bb, setBB] = React.useState();
  const [bbtb, setBBTB] = React.useState();
  const [bbum, setBBUM] = React.useState();
  const [tbum, setTBUM] = React.useState();
  const [note, setNote] = React.useState();
  const [modalOk, setModalOk] = React.useState(false);

  const [expanded, setExpanded] = React.useState({
    bbtb: false,
    bbum: false,
    tbum: false,
  });

  // Nav
  const navigation = useNavigation();
  const route = useRoute();

  // STAT
  const {showModal, changeModal, hideModal, modalState} =
    React.useContext(ModalContext);

  const DATA_USER = route.params?.user;
  const DATA_IMUNISASI = route.params?.imunisasi;

  const GENDER = DATA_USER?.gender == 'male' ? 'Laki - laki' : 'Perempuan';

  const CHART_HASIL = {
    BBTB: [
      'Gizi buruk (Severely Wasted)',
      'Gizi kurang (Wasted)',
      'Gizi baik (Normal)',
      'Beresiko gizi lebih (Posible risk of overweight)',
      'Obesitas',
    ],
    BBUM: [
      'Sangat pendek (Severely Stunted)',
      'Pendek (Stunted)',
      'Normal',
      'Tinggi',
    ],
    TBUM: [
      'Sangat pendek (Severely Underweight)',
      'Berat badan kurang (Underweight)',
      'Berat badan normal',
      'Resiko berat badan lebih',
    ],
  };

  async function onSubmitHasil() {
    await showModal({type: 'loading'});
    try {
      await usersCollection
        .doc(DATA_USER?.parentId)
        .collection('History')
        .add({
          imunisasi: DATA_IMUNISASI,
          child: {
            ...DATA_USER,
            hasilImunisasi: {
              tb: tb,
              bb: bb,
              bbtb: bbtb,
              bbum: bbum,
              tbum: tbum,
              catatan: note,
            },
            imunisasiStatus: 'DONE',
            imunisasiTanggal: moment().format(),
          },
        });

      await usersCollection
        .doc(DATA_USER?.parentId)
        .collection('childs')
        .doc(DATA_USER?.id)
        .collection('imunisasi')
        .add({
          tb: tb,
          bb: bb,
          createdDate: moment().format(),
          umur: hitungUmur(DATA_USER?.date),
          catatan: note,
        });

      const isExistOnHistory = (
        await historyCollection.doc(DATA_IMUNISASI?.id).get()
      ).exists;

      if (!isExistOnHistory) {
        await historyCollection.doc(DATA_IMUNISASI?.id).set(DATA_IMUNISASI);
      }

      await historyCollection
        .doc(DATA_IMUNISASI?.id)
        .collection('Registered')
        .add({
          imunisasi: DATA_IMUNISASI,
          child: {
            ...DATA_USER,
            hasilImunisasi: {
              tb: tb,
              bb: bb,
              bbtb: bbtb,
              bbum: bbum,
              tbum: tbum,
              catatan: note,
            },
            imunisasiStatus: 'DONE',
            imunisasiTanggal: moment().format(),
          },
        });

      await imunisasiCollection
        .doc(DATA_IMUNISASI?.id)
        .collection('Registered')
        .doc(DATA_USER?.id)
        .update({
          hasilImunisasi: {
            tb: tb,
            bb: bb,
            bbtb: bbtb,
            bbum: bbum,
            tbum: tbum,
            catatan: note,
          },
          imunisasiStatus: 'DONE',
          imunisasiTanggal: moment().format(),
        })
        .then(async () => {
          setModalOk(true);
          await changeModal({
            type: 'popup',
            status: 'OK',
            message: 'Data imunisasi berhasil disimpan!',
          });
        });

      await sendNotification(
        [DATA_USER?.fcmToken],
        `Sdr. ${
          DATA_USER?.name
        } telah dilakukan imunisasi pada ${moment().format('DD MMMM YYYY')}`,
      );
    } catch (error) {
      console.log(error);
      setModalOk(false);
      await changeModal({
        type: 'popup',
        status: 'ERROR',
        message: 'Ada sesuatu yang tidak beres, silahkan coba lagi!',
      });
    }
  }

  return (
    <View style={styles.container}>
      <AppBar title="Detail Imunisasi" showBack={true} style={styles.appBar} />
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <CustomCard.ImunisasiCard
          data={DATA_IMUNISASI}
          user={DATA_USER}
          small
          admin
          style={{margin: 4, backgroundColor: Colors.COLOR_WHITE}}
        />
        <Gap height={14} />
        <View style={styles.rowTop}>
          <View style={styles.rowContent}>
            <Text style={styles.textTopCaption} variant={'labelMedium'}>
              Nama lengkap
            </Text>
            <Text style={styles.textTopValue} variant={'bodyLarge'}>
              {DATA_USER?.name}
            </Text>
          </View>
          <View style={styles.rowContentRight}>
            <Text style={styles.textTopCaption} variant={'labelMedium'}>
              Tanggal Lahir
            </Text>
            <Text style={styles.textTopValue} variant={'bodyLarge'}>
              {moment(DATA_USER?.date).format('DD MMMM YYYY')}
            </Text>
          </View>
        </View>
        <View style={styles.rowTop}>
          <View style={styles.rowContent}>
            <Text style={styles.textTopCaption} variant={'labelMedium'}>
              Umur anak
            </Text>
            <Text style={styles.textTopValue} variant={'bodyLarge'}>
              {hitungUmur(DATA_USER?.date)} tahun
            </Text>
          </View>
          <View style={styles.rowContentRight}>
            <Text style={styles.textTopCaption} variant={'labelMedium'}>
              Jenis kelamin
            </Text>
            <Text style={styles.textTopValue} variant={'bodyLarge'}>
              {DATA_USER?.gender == 'male' ? 'Laki - laki' : 'Perempuan'}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.textTopCaption} variant={'labelMedium'}>
            Alamat
          </Text>
          <Text style={styles.textTopValue} variant={'bodyLarge'}>
            {DATA_USER?.alamat}
          </Text>
        </View>
        <Divider style={styles.divider} bold />
        <Text variant={'titleLarge'} style={styles.textSubtitle}>
          Masukan hasil imunisasi
        </Text>
        <Gap height={24} />
        <Text variant={'labelLarge'} style={styles.labelTitle}>
          Tinggi Badan
        </Text>
        <TextInput
          mode={'outlined'}
          placeholder="Masukan tinggi badan disini..."
          placeholderTextColor={Colors.COLOR_GREY}
          onChangeText={te => setTB(te)}
          value={tb}
          keyboardType={'phone-pad'}
          maxLength={3}
        />
        <Gap height={20} />
        <Text variant={'labelLarge'} style={styles.labelTitle}>
          Berat Badan
        </Text>
        <TextInput
          mode={'outlined'}
          placeholder="Masukan berat badan disini..."
          placeholderTextColor={Colors.COLOR_GREY}
          onChangeText={te => setBB(te)}
          value={bb}
          keyboardType={'phone-pad'}
          maxLength={3}
        />
        <Gap height={20} />
        <Text variant={'labelLarge'} style={styles.labelTitle}>
          Kondisi BB Menurut TB {GENDER}
        </Text>
        <List.Accordion
          style={styles.expandContainer}
          title={bbtb || 'Pilih hasil imunisasi'}
          expanded={expanded.bbtb}
          onPress={() => setExpanded({...expanded, bbtb: !expanded.bbtb})}
          id="1">
          {CHART_HASIL.BBTB.map((item, index) => {
            return (
              <List.Item
                key={item + index}
                title={item}
                style={styles.expandContent}
                onPress={() => {
                  setBBTB(item);
                  setExpanded({...expanded, bbtb: !expanded.bbtb});
                }}
              />
            );
          })}
        </List.Accordion>
        <Gap height={20} />
        <Text variant={'labelLarge'} style={styles.labelTitle}>
          Kondisi BB Menurut Umur {GENDER}
        </Text>
        <List.Accordion
          style={styles.expandContainer}
          title={bbum || 'Pilih hasil imunisasi'}
          id="1"
          expanded={expanded.bbum}
          onPress={() => setExpanded({...expanded, bbum: !expanded.bbum})}>
          {CHART_HASIL.BBUM.map((item, index) => {
            return (
              <List.Item
                key={item + index}
                title={item}
                style={styles.expandContent}
                onPress={() => {
                  setBBUM(item);
                  setExpanded({...expanded, bbum: !expanded.bbum});
                }}
              />
            );
          })}
        </List.Accordion>
        <Gap height={20} />
        <Text variant={'labelLarge'} style={styles.labelTitle}>
          Kondisi BB Menurut Umur {GENDER}
        </Text>
        <List.Accordion
          style={styles.expandContainer}
          title={tbum || 'Pilih hasil imunisasi'}
          id="1"
          expanded={expanded.tbum}
          onPress={() => setExpanded({...expanded, tbum: !expanded.tbum})}>
          {CHART_HASIL.BBUM.map((item, index) => {
            return (
              <List.Item
                key={item + index}
                title={item}
                style={styles.expandContent}
                onPress={() => {
                  setTBUM(item);
                  setExpanded({...expanded, tbum: !expanded.tbum});
                }}
              />
            );
          })}
        </List.Accordion>
        <Gap height={20} />
        <Text variant={'labelLarge'} style={styles.labelTitle}>
          Catatan
        </Text>
        <TextInput
          style={styles.catatanInput}
          mode={'outlined'}
          placeholder="Masukan catatan disini..."
          placeholderTextColor={Colors.COLOR_GREY}
          onChangeText={te => setNote(te)}
          multiline={true}
          maxLength={256}
          value={note}
        />
        <Gap height={52} />
        <CustomButton
          disabled={!bb || !tb || !bbtb || !bbum || !tbum}
          onPress={() => onSubmitHasil()}>
          Konfirmasi
        </CustomButton>
      </ScrollView>
      <ModalView
        visible={modalState.visible}
        type={modalState.type}
        message={modalState.message}
        onPress={() => hideModal()}
        status={modalState?.status}
        onModalHide={() => {
          modalOk ? navigation.goBack() : null;
        }}
      />
    </View>
  );
};

export default ImunisasiScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },

  scrollContent: {
    paddingBottom: Scaler.scaleSize(120),
  },

  appBar: {},

  mainContainer: {
    flex: 1,
    padding: Size.SIZE_24,
  },

  rowTop: {
    flexDirection: 'row',
    paddingVertical: Size.SIZE_14,
    alignItems: 'center',
  },
  rowContent: {
    flex: 1,
  },

  rowContentRight: {
    flex: 1,
    alignItems: 'flex-end',
  },

  verticalLabel: {
    width: 4,
    borderRadius: 4,
    backgroundColor: Colors.COLOR_PRIMARY,
    height: '100%',
    marginRight: Size.SIZE_14,
  },

  divider: {
    marginVertical: Size.SIZE_24,
  },

  listButton: {
    marginRight: Size.SIZE_14,
  },

  chartContainer: {
    marginTop: Size.SIZE_24,
  },

  chartCard: {
    padding: Size.SIZE_14,
    backgroundColor: Colors.COLOR_WHITE,
  },

  chartTitleContainer: {
    marginBottom: Size.SIZE_14,
    marginLeft: Size.SIZE_14,
  },

  expandContainer: {
    borderWidth: 0.5,
    borderRadius: 4,
    paddingVertical: 4,
  },

  expandContent: {
    backgroundColor: Colors.COLOR_BACKGROUND,
    borderBottomWidth: 0.8,
    borderColor: Colors.COLOR_LIGHT_GRAY,
    paddingVertical: Size.SIZE_12,
  },

  catatanInput: {
    height: Scaler.scaleSize(120),
    textAlignVertical: 'top',
    lineHeight: 24,
  },

  // Text

  textSubtitle: {
    fontWeight: 'bold',
  },

  textTopCaption: {
    color: Colors.COLOR_GREY,
  },

  textTopValue: {
    fontWeight: 'bold',
  },

  textCardTitle: {
    fontWeight: 'bold',
  },

  labelTitle: {
    fontSize: FONT_SIZE_16,
    marginBottom: Scaler.scaleSize(8),
    color: Colors.COLOR_BLACK,
    fontWeight: 'bold',
  },
});
