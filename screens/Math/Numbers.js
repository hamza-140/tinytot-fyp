import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Tts from 'react-native-tts';

import Sound from 'react-native-sound';
import Card from '../../components/Card';
import {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const Numbers = ({navigation}) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const folderRef = storage().ref('lessons/Math/Numbers/');
        const items = await folderRef.listAll();
        const filesData = await Promise.all(
          items.items.map(async item => {
            const url = await item.getDownloadURL();
            console.log('URL for ' + item.name + ':', url); // Log URL for debugging
            return {name: item.name, url};
          }),
        );
        setFiles(filesData);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);
  const speak = text => {
    Tts.speak(text);
  };

  const renderItem = ({item}) => (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
      <Image
        source={{uri: item.url}}
        style={{width: 50, height: 50, marginRight: 10}}
      />
      <Text>{item.name}</Text>
    </View>
  );

  const renderCard = ({item}) => (
    <Card
      letter={item.name}
      onPress={() => speak(item.name)}
      imageSource={item.url}
    />
  );

  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={files}
          horizontal
          renderItem={renderCard}
          keyExtractor={item => item.name}
          contentContainerStyle={styles.flatListContainer}
        />
        <Image
          source={require('../../assets/panda.png')}
          style={styles.overlayImage}
        />
        <TouchableOpacity
          style={styles.setting}
          onPress={() => {
            navigation.navigate('Math');
          }}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.settingimg}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Numbers;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  overlayImage: {
    position: 'absolute',
    bottom: 10,
    left: 100,
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  setting: {
    position: 'absolute',
    top: 0,
    left: -30,
  },
  settingimg: {
    width: 130,
    height: 60,
    resizeMode: 'cover',
  },
  sound: {
    position: 'absolute',
    top: 0,
    left: 5,
  },
  soundimg: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
});
