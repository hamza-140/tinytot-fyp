import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Card from '../../components/Card';
import CardMenu from '../../components/CardMenu';

const MathHome = ({navigation}) => {
  const start = id => {
    if (id == 1) {
      navigation.navigate('MathLesson');
    }
    if (id == 2) {
      navigation.navigate('PhonicsHome');
    }
    if (id == 3) {
      navigation.navigate('Shape');
    }
    if (id == 4) {
      navigation.navigate('Animals');
    }
  };
  const data = [
    {id: '1', title: 'Lessons', bg: '#FF6F61', img: 1},
    {id: '2', title: 'Phonics', bg: '#800080', img: 2},
    {id: '3', title: 'Shapes', bg: '#1E90FF', img: 3},
    {id: '4', title: 'Animals', bg: '#FFA500', img: 4},
  ];
  const renderCard = ({item}) => (
    <CardMenu
      letter={item.title}
      onPress={() => start(item.id)}
      bg={item.bg}
      img={item.img}
    />
  );

  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
        <Image
          source={require('../../assets/panda.png')}
          style={styles.overlayImage}
        />
        <TouchableOpacity
          style={styles.setting}
          onPress={() => {
            navigation.navigate('Main');
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

export default MathHome;
const cardWidth = 150;
const cardMarginHorizontal = 20;

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
  card: {
    width: cardWidth,
    height: 150,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: cardMarginHorizontal, // Add margin between cards
  },
  cardText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
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
