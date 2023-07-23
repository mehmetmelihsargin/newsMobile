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
  TouchableOpacity,
  Linking,
} from 'react-native';
import axios from 'axios';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import settingIcon from './assets/settingIcon.png';
import backArrow from './assets/backArrow.png';

const App = () => {
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
  const onPress = (url: any) => {
    Linking.openURL(url);
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
          <Image style={styles.assets} source={backArrow} />
          <TextInput
            editable
            maxLength={20}
            onChangeText={text => onChangeText(text)}
            value={value}
            style={styles.headerInput}
            onFocus={() => onChangeText('')}
            onBlur={() => onChangeText('Haber başlığı arayın...')}
          />
          <Image style={styles.assets} source={settingIcon} />
        </View>
        <View style={styles.container}>
          {newsList.map((item: any) => (
            <TouchableOpacity
              key={item.title}
              onPress={() => onPress(item.url)}>
              <View style={styles.contentView}>
                <Image style={styles.tinyLogo} source={getRandomImage()} />
                <Text style={styles.text}>{item.author}</Text>
                <Text style={styles.text}>{item.title}</Text>
              </View>
            </TouchableOpacity>
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
    width: 300,
    height: 220,
  },
  text: {
    color: 'black',
  },
  assets: {
    height: 25,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#7432ff',
  },
  headerInput: {
    backgroundColor: 'white',
    color: '#000',
    borderRadius: 15,
    fontSize: 18,
    width: 280,
    paddingHorizontal: 12,
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
    borderColor: '#c5f516',
    borderWidth: 2,
    margin: 8,
    borderRadius: 10,
  },
});

export default App;
