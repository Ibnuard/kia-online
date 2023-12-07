import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';
import {Colors, Size} from '../styles';
import {Card, CustomButton} from '../components';
import {Divider, Text} from 'react-native-paper';

const HistoryDetailScreen = () => {
  const [selectedChart, setSelectedChart] = React.useState('BBTB');

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

  return (
    <View style={styles.container}>
      <AppBar title="Detail Imunisasi" showBack={true} style={styles.appBar} />
      <ScrollView style={styles.mainContainer}>
        <Card.ImunisasiCard small />
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
            <View style={styles.rowTop}>
              <View style={styles.verticalLabel} />
              <View>
                <Text>Label</Text>
                <Text>Value</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HistoryDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
