import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';
import {Colors, Scaler, Size} from '../styles';
import {Card as CustomCard, CustomButton} from '../components';
import {Card, Divider, Text} from 'react-native-paper';
import {BarChart, LineChart} from 'react-native-gifted-charts';

const HistoryDetailScreen = () => {
  const [selectedChart, setSelectedChart] = React.useState('BBTB');

  const screenWidth = Dimensions.get('window').width;

  const CHART_BUTTON = [
    {
      key: 'BBTB',
      title: 'BB menurut TB anak perempuan',
    },
    {
      key: 'BBUM',
      title: 'BB menurut Umur anak perempuan',
    },
    {
      key: 'TBUM',
      title: 'TB menurut Umur anak perempuan',
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

  // LINE CHART DATA
  const data_chart = [
    {value: 8, label: 20},
    {value: 10, label: 18},
  ];

  return (
    <View style={styles.container}>
      <AppBar title="Detail Imunisasi" showBack={true} style={styles.appBar} />
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <CustomCard.ImunisasiCard small />
        <View style={styles.rowTop}>
          <View style={styles.rowContent}>
            <Text style={styles.textTopCaption} variant={'labelMedium'}>
              Kode Booking
            </Text>
            <Text style={styles.textTopValue} variant={'bodyLarge'}>
              1334
            </Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.textTopCaption} variant={'labelMedium'}>
              Nama Lengkap
            </Text>
            <Text style={styles.textTopValue} variant={'bodyLarge'}>
              1334
            </Text>
          </View>
        </View>
        <View style={styles.rowTop}>
          <View style={styles.rowContent}>
            <Text style={styles.textTopCaption} variant={'labelMedium'}>
              Umur anak
            </Text>
            <Text style={styles.textTopValue} variant={'bodyLarge'}>
              1334
            </Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.textTopCaption} variant={'labelMedium'}>
              Jenis kelamin
            </Text>
            <Text style={styles.textTopValue} variant={'bodyLarge'}>
              1334
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.textTopCaption} variant={'labelMedium'}>
            Alamat
          </Text>
          <Text style={styles.textTopValue} variant={'bodyLarge'}>
            1334
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
              1334
            </Text>
          </View>
          <View style={styles.rowContent}>
            <Text style={styles.textTopCaption} variant={'labelMedium'}>
              Berat badan
            </Text>
            <Text style={styles.textTopValue} variant={'bodyLarge'}>
              1334
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.textTopCaption} variant={'labelMedium'}>
            Catatan
          </Text>
          <Text style={styles.textTopValue} variant={'bodyLarge'}>
            1334
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          overScrollMode={'never'}
          style={{flexGrow: 0, paddingVertical: Size.SIZE_14}}>
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
          <Card style={styles.chartCard}>
            <View style={styles.chartTitleContainer}>
              <Text variant={'titleMedium'} style={styles.textCardTitle}>
                Berat Badan Menurut Tinggi Badan Anak Perempuan
              </Text>
            </View>
            <LineChart
              spacing={30}
              width={screenWidth - 140}
              height={320}
              data={data_chart}
              color={Colors.COLOR_PRIMARY}
              dataPointsColor={Colors.COLOR_PRIMARY}
            />
          </Card>
          <Card style={styles.chartCard}>
            <View style={styles.chartTitleContainer}>
              <Text variant={'titleMedium'} style={styles.textCardTitle}>
                Berat Badan Menurut Umur Anak Perempuan
              </Text>
            </View>
            <BarChart
              spacing={30}
              width={screenWidth - 140}
              frontColor={Colors.COLOR_PRIMARY}
              height={320}
              data={data_chart}
              color={Colors.COLOR_PRIMARY}
              dataPointsColor={Colors.COLOR_PRIMARY}
            />
          </Card>
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
