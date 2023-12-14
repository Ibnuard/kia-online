import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';
import {Colors, Scaler, Size} from '../styles';
import {Card as CustomCard, CustomButton, Gap} from '../components';
import {Card, Divider, Text} from 'react-native-paper';
import {BarChart, LineChart} from 'react-native-gifted-charts';
import {useRoute} from '@react-navigation/native';
import {hitungUmur} from '../utils/utils';
import {usersCollection} from '../utils/Database';

const HistoryDetailScreen = () => {
  const [selectedChart, setSelectedChart] = React.useState('BBTB');
  const [rekapHasilBBTB, setRekapHasilBBTB] = React.useState();
  const [rekapHasilBBUM, setRekapHasilBBUM] = React.useState();
  const [rekapHasilTBUM, setRekapHasilTBUM] = React.useState();

  const screenWidth = Dimensions.get('window').width;

  const route = useRoute();

  console.log(route?.params?.data);
  const CHILD_DATA = route.params?.data?.child;
  const IMUNISASI_DATA = route?.params?.data?.imunisasi;

  const HASIL_IMUN = CHILD_DATA?.hasilImunisasi;

  const gender = CHILD_DATA?.gender == 'male' ? 'Laki - laki' : 'Perempuan';

  const CHART_BUTTON = [
    {
      key: 'BBTB',
      title: `BB menurut TB anak ${gender}`,
    },
    {
      key: 'BBUM',
      title: `BB menurut Umur anak ${gender}`,
    },
    {
      key: 'TBUM',
      title: `TB menurut Umur anak ${gender}`,
    },
  ];

  const CHART_OPT = {
    BBTB: [
      '< - 3 SD#Gizi buruk (Severely Wasted)',
      '- 3 SD sampai dengan < - 2 SD#Gizi kurang (Wasted)',
      '-2 SD sampai dengan + 1 SD#Gizi baik (Normal)',
      '> + 2 SD sampai dengan + 2 SD#Beresiko gizi lebih (Posible risk of overweight)',
      '> 3 SD#Obesitas',
    ],
    BBUM: [
      '< - 3 SD#Sangat pendek (Severely Stunted)',
      '- 3 SD sampai dengan < - 2 SD#Pendek (Stunted)',
      '-2 SD sampai dengan + 1 SD#Normal',
      '> + 2 SD sampai dengan + 2 SD#Tinggi',
    ],
    TBUM: [
      '< - 3 SD#Sangat pendek (Severely Underweight)',
      '- 3 SD sampai dengan < - 2 SD#Berat badan kurang (Underweight)',
      '-2 SD sampai dengan + 1 SD#Berat badan normal',
      '> + 1 SD#Resiko berat badan lebih',
    ],
  };

  React.useEffect(() => {
    getRecap();
  }, []);

  async function getRecap() {
    try {
      await usersCollection
        .doc(CHILD_DATA?.parentId)
        .collection('childs')
        .doc(CHILD_DATA?.id)
        .collection('imunisasi')
        .onSnapshot(snap => {
          let temp = [];
          snap.forEach(doc => {
            temp.push({...doc.data(), id: doc?.id});
          });

          if (temp.length) {
            // BB TB
            let newData = [{value: 0, label: 0}];
            for (const data of temp) {
              const bd = {value: data.bb, label: data.tb};
              newData.push(bd);
            }

            // BB UM
            let newDataBBUM = [{value: 0, label: 0}];
            for (const data of temp) {
              const bd = {value: data.bb, label: data.umur};
              newDataBBUM.push(bd);
            }

            // TB UM
            let newDataTBUM = [{value: 0, label: 0}];
            for (const data of temp) {
              const bd = {value: data.tb, label: data.umur};
              newDataTBUM.push(bd);
            }

            setRekapHasilTBUM(newDataTBUM);
            setRekapHasilBBUM(newDataBBUM);
            setRekapHasilBBTB(newData);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  // LINE CHART DATA
  const getKesimpulan = () => {
    switch (selectedChart) {
      case 'BBTB':
        return HASIL_IMUN?.bbtb;
        break;
      case 'BBUM':
        return HASIL_IMUN?.bbum;
        break;
      case 'TBUM':
        return HASIL_IMUN?.tbum;
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <AppBar title="Detail Imunisasi" showBack={true} style={styles.appBar} />
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <CustomCard.ImunisasiCard
          data={{...IMUNISASI_DATA, antrian: CHILD_DATA?.antrian}}
          small
          isHistory
        />
        <View style={styles.rowTop}>
          <View style={styles.rowContent}>
            <Text style={styles.textTopCaption} variant={'labelMedium'}>
              Nama Lengkap
            </Text>
            <Text style={styles.textTopValue} variant={'bodyLarge'}>
              {CHILD_DATA?.name}
            </Text>
          </View>
        </View>
        <View style={styles.rowTop}>
          <View style={styles.rowContent}>
            <Text style={styles.textTopCaption} variant={'labelMedium'}>
              Umur
            </Text>
            <Text style={styles.textTopValue} variant={'bodyLarge'}>
              {hitungUmur(CHILD_DATA?.date)} tahun
            </Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.textTopCaption} variant={'labelMedium'}>
              Jenis kelamin
            </Text>
            <Text style={styles.textTopValue} variant={'bodyLarge'}>
              {CHILD_DATA?.gender == 'male' ? 'Laki - laki' : 'Perempuan'}
            </Text>
          </View>
        </View>
        <Gap height={14} />
        <View>
          <Text style={styles.textTopCaption} variant={'labelMedium'}>
            Alamat
          </Text>
          <Text style={styles.textTopValue} variant={'bodyLarge'}>
            {CHILD_DATA?.alamat}
          </Text>
        </View>
        <Divider style={styles.divider} bold />
        <Text variant={'titleLarge'} style={styles.textSubtitle}>
          Hasil dari imunisasi
        </Text>
        <View style={styles.rowTop}>
          <View style={styles.rowContent}>
            <Text style={styles.textTopCaption} variant={'labelMedium'}>
              Tinggi badan
            </Text>
            <Text style={styles.textTopValue} variant={'bodyLarge'}>
              {HASIL_IMUN?.tb} cm
            </Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.textTopCaption} variant={'labelMedium'}>
              Berat badan
            </Text>
            <Text style={styles.textTopValue} variant={'bodyLarge'}>
              {HASIL_IMUN?.bb} kg
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.textTopCaption} variant={'labelMedium'}>
            Catatan
          </Text>
          <Text style={styles.textTopValue} variant={'bodyLarge'}>
            {HASIL_IMUN?.catatan || '-'}
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          overScrollMode={'never'}
          style={{
            flexGrow: 0,
            paddingVertical: Size.SIZE_14,
            marginTop: Size.SIZE_14,
          }}>
          {CHART_BUTTON.map((item, index) => {
            return (
              <CustomButton
                key={item + index}
                mode={selectedChart == item.key ? 'contained' : 'outlined'}
                labelStyle={{
                  color:
                    selectedChart == item?.key
                      ? Colors.COLOR_WHITE
                      : Colors.COLOR_BLACK,
                }}
                onPress={() => setSelectedChart(item.key)}
                style={styles.listButton}>
                {item.title}
              </CustomButton>
            );
          })}
        </ScrollView>
        <View style={{paddingVertical: Size.SIZE_14}}>
          <Text style={styles.textTopCaption} variant={'labelMedium'}>
            Kondisi Anak
          </Text>
          <Text style={styles.textTopValue} variant={'bodyLarge'}>
            {getKesimpulan()}
          </Text>
        </View>
        <View>
          <View style={styles.rowTop}>
            <Text
              style={{...styles.textSubtitle, flex: 1}}
              variant={'titleMedium'}>
              Keterangan Grafik
            </Text>
            <Text>Permenkes no. 2 tahun 2020</Text>
          </View>
          <View>
            {CHART_OPT[selectedChart].map((item, index) => {
              const LABELED = item.split('#');
              return (
                <View key={item + index} style={styles.rowTop}>
                  <View style={styles.verticalLabel} />
                  <View>
                    <Text>{LABELED[0]}</Text>
                    <Text>{LABELED[1]}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.chartContainer}>
          {selectedChart == 'BBTB' ? (
            <Card style={styles.chartCard}>
              <View style={styles.chartTitleContainer}>
                <Text variant={'titleMedium'} style={styles.textCardTitle}>
                  Berat Badan Menurut Tinggi Badan Anak{' '}
                  {CHILD_DATA?.gender == 'male' ? 'Laki - laki' : 'Perempuan'}
                </Text>
              </View>
              <LineChart
                spacing={30}
                width={screenWidth - 140}
                height={320}
                data={rekapHasilBBTB || [{value: 0, label: 0}]}
                yAxisLabelTexts={[
                  0, 20, 40, 80, 90, 100, 120, 140, 160, 180, 200,
                ]}
                color={Colors.COLOR_PRIMARY}
                dataPointsColor={Colors.COLOR_PRIMARY}
              />
            </Card>
          ) : (
            <Card style={styles.chartCard}>
              <View style={styles.chartTitleContainer}>
                <Text variant={'titleMedium'} style={styles.textCardTitle}>
                  {selectedChart == 'BBUM' ? 'Berat Badan' : 'Tinggi Badan'}{' '}
                  Menurut Umur{' '}
                  {CHILD_DATA?.gender == 'male' ? 'Laki - laki' : 'Perempuan'}
                </Text>
              </View>
              <BarChart
                spacing={30}
                width={screenWidth - 140}
                frontColor={Colors.COLOR_PRIMARY}
                height={320}
                yAxisLabelTexts={[
                  0, 20, 40, 80, 90, 100, 120, 140, 160, 180, 200,
                ]}
                data={selectedChart == 'BBUM' ? rekapHasilBBUM : rekapHasilTBUM}
                color={Colors.COLOR_PRIMARY}
                dataPointsColor={Colors.COLOR_PRIMARY}
              />
            </Card>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HistoryDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

  scrollContent: {
    paddingBottom: Scaler.scaleSize(120),
  },

  appBar: {
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

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
});
