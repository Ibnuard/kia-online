import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Size} from '../styles';
import AppBar from '../components/AppBar';
import {Card, List, Text} from 'react-native-paper';
import {Gap} from '../components';

const HelpScreen = () => {
  const FAQS = [
    {
      title: 'Apa yang bisa dilakukan aplikasi ini?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      title: 'Bagaimana saya mendaftarkan anak saya?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      title: 'Apakah semua data yang diberikan akurat?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <AppBar
        showBack={true}
        title="Informasi dan Bantuan"
        style={styles.appBar}
      />
      <View style={styles.mainContainer}>
        <Text variant={'titleMedium'} style={styles.textTitle}>
          Tentang Kami
        </Text>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant={'labelLarge'}>
              Melalui aplikasi perkembangan anak, orangtua dapat dengan mudah
              memantau dan mendokumentasikan setiap langkah penting dalam
              perkembangan anak mereka, mulai dari pencapaian milstone
              perkembangan fisik, kognitif, hingga sosial. Aplikasi ini
              menyediakan panduan yang informatif dan interaktif, memberikan
              saran serta aktivitas yang mendukung pertumbuhan optimal anak,
              sementara juga memberikan orangtua wawasan berharga untuk
              membangun hubungan positif dan mendukung kesejahteraan anak
              mereka.
            </Text>
          </Card.Content>
        </Card>
        <Gap height={24} />
        <Text variant={'titleMedium'} style={styles.textTitle}>
          Pertanyaan yang sering ditanyakan
        </Text>
        <List.AccordionGroup>
          {FAQS.map((item, index) => {
            return (
              <>
                <List.Accordion
                  key={item + index}
                  style={styles.expandHeader}
                  titleNumberOfLines={3}
                  title={item.title}
                  id={String(index + 1)}>
                  <List.Item
                    style={styles.expandItem}
                    descriptionNumberOfLines={100}
                    description={item.content}
                    titleStyle={styles.textExpandText}
                  />
                </List.Accordion>
                <Gap height={14} />
              </>
            );
          })}
        </List.AccordionGroup>
      </View>
    </ScrollView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_BACKGROUND,
  },

  appBar: {},

  mainContainer: {
    flex: 1,
    paddingHorizontal: Size.SIZE_24,
    paddingVertical: Size.SIZE_14,
  },

  card: {
    backgroundColor: Colors.COLOR_WHITE,
  },

  expandItem: {
    backgroundColor: Colors.COLOR_WHITE,
  },

  expandHeader: {
    backgroundColor: Colors.COLOR_WHITE,
    borderRadius: 12,
  },

  // text

  textTitle: {
    fontWeight: 'bold',
    marginBottom: Size.SIZE_12,
  },

  textExpandText: {
    height: 0,
  },
});
