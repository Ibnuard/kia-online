import {FlatList, Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Scaler, Size} from '../styles';
import {ActivityIndicator, Card, Text} from 'react-native-paper';
import {CustomButton, Gap, Card as CustomCard} from '../components';
import {useFocusEffect} from '@react-navigation/native';
import {ASSETS} from '../utils/assetsLoader';
import {AuthContext} from '../context';

const HomeScreen = () => {
  const [news, setNews] = React.useState([]);

  // User session
  const {user} = React.useContext(AuthContext);

  console.log(user);

  React.useEffect(() => {
    getNews();

    return () => null;
  }, []);

  // get news
  async function getNews() {
    console.log('GET NEWS');
    const res = await fetch(
      'https://berita-indo-api-next.vercel.app/api/suara-news/health',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', //or other
        },
      },
    );

    const resJson = await res.json();

    if (resJson.length !== 0) {
      setNews(resJson.data.slice(0, 5));
    } else {
      console.log('Error fetching');
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={styles.topContent}>
        <Text style={styles.textHi} variant={'bodyMedium'}>
          Halo, {user?.name}
        </Text>
      </View>

      <Text style={styles.textTitle} variant={'titleMedium'}>
        Jadwal Imunisasi Anak
      </Text>

      <Card mode={'contained'} style={styles.cardNoJadwal}>
        <Card.Content>
          <Text style={styles.textCardNoJadwal} variant={'labelMedium'}>
            Belum ada jadwal imunisasi
          </Text>
        </Card.Content>
      </Card>

      <Text style={styles.textTitle} variant={'titleMedium'}>
        Berita Terbaru
      </Text>
      <Gap height={10} />
      <View style={styles.promoContainer}>
        <Image
          source={ASSETS.promo}
          style={styles.promoImg}
          resizeMode={'contain'}
        />
        <View style={styles.promoButtonContainer}>
          <CustomButton
            style={styles.promoButton}
            labelStyle={styles.promoButtonLabel}>
            Baca sekarang
          </CustomButton>
        </View>
      </View>
      <Text style={styles.textTitle} variant={'titleMedium'}>
        Buletin Kesehatan
      </Text>
      <Gap height={10} />
      <View style={styles.newsContainer}>
        {news && news.length ? (
          news.map((item, index) => {
            return <CustomCard.BeritaCard key={item + index} data={item} />;
          })
        ) : (
          <View style={styles.newsLoading}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_BACKGROUND,
    padding: Size.SIZE_24,
  },

  cardNoJadwal: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.COLOR_WHITE,
    minHeight: Scaler.scaleSize(72),
    marginVertical: Size.SIZE_14,
  },

  topContent: {
    marginBottom: Size.SIZE_20,
  },

  promoContainer: {
    borderRadius: 8,
    marginBottom: Size.SIZE_14,
  },

  promoImg: {
    width: '100%',
    height: Scaler.scaleSize(150),
    borderRadius: 8,
  },

  promoButtonContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 14,
  },

  promoButtonLabel: {
    paddingHorizontal: 12,
    color: Colors.COLOR_BLACK,
  },

  promoButton: {
    backgroundColor: Colors.COLOR_WHITE,
  },

  newsContainer: {
    flex: 1,
    paddingBottom: Size.SIZE_24,
  },

  newsLoading: {flex: 1, justifyContent: 'center'},

  // text

  textHi: {
    color: Colors.COLOR_BLACK,
  },

  textTitle: {
    color: Colors.COLOR_BLACK,
    fontWeight: 'bold',
  },

  textCardNoJadwal: {
    color: Colors.COLOR_GREY,
  },
});
