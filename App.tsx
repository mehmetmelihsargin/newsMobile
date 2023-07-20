import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Text,
  Image,
} from 'react-native';
import axios from 'axios';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Home = () => {
  const [newsList, setNewsList] = useState([]);
  const [value, onChangeText] = useState('Haber başlığı arayın...');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('https://news-api-bice.vercel.app/');
      const data = response.data;
      setNewsList(data.articles);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  const getRandomImage = () => {
    const randomId = Math.floor(Math.random() * 100);
    return {uri: `https://picsum.photos/id/${randomId}/300/200`};
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.headerView}>
          <TextInput
            editable
            maxLength={40}
            onChangeText={text => onChangeText(text)}
            value={value}
            style={styles.headerInput}
            onFocus={() => onChangeText('')}
            onBlur={() => onChangeText('Haber başlığı arayın...')}
          />
        </View>
        <View style={styles.container}>
          {newsList.map((item: any) => (
            <View style={styles.contentView}>
              <Image style={styles.tinyLogo} source={getRandomImage()} />
              <Text>{item.author}</Text>
              <Text>{item.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  tinyLogo: {
    width: 220,
    height: 220,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  headerView: {
    display: 'flex',
    padding: 20,
    backgroundColor: '#0ea5e9',
  },
  headerInput: {
    backgroundColor: '#ecfdf5',
    color: '#000',
    borderRadius: 15,
    fontSize: 18,
  },
  container: {
    padding: 16,
  },
  cardContainer: {
    borderRadius: 8,
    marginBottom: 16,
  },
  cardImage: {
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  publishedAt: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 8,
    color: '#8B5CF6',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  readMore: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#0084FF',
  },
  contentView: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    alignItems: 'center',
  },
});

export default Home;
