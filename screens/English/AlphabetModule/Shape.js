import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useIsFocused } from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import CardComponent from '../../../components/CardComponent';

const Shape = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
 
  const predefinedBg = [
    '#FEDABC',
    '#E77DFE',
    '#A5FECA',
    '#D6EAF8',
  ];
  const predefinedColor = [
    '#FE9D50',
    '#A51AC7',
    '#2ECD70',
    '#0057A7',
  ];
  
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * predefinedBg.length);
    console.log(randomIndex)
    setIndex(randomIndex);
    const fetchShapesData = async () => {
      try {
        const shapesCollection = await firestore().collection('shapes').get();
        console.log('Shapes Collection:', shapesCollection.docs);

        const shapesData = await Promise.all(
          shapesCollection.docs.map(async (doc) => {
            const shape = doc.data();
            console.log('Shape Data:', shape);
            try {
                const imageRef = storage().ref(`shapes/${shape.title}.png`);
                const imageUrl = await imageRef.getDownloadURL();
              return {
                id: doc.id,
                title: shape.title,
                svg:shape.svg,
                image: imageUrl,
                color: predefinedColor[index], // or any default color or fetch from the document if available
                bg: predefinedBg[index], // or any default background color or fetch from the document if available
              };
            } catch (error) {
              console.error(`Error fetching image for ${shape.title}:`, error);
              return {
                id: doc.id,
                svg:shape.svg,
                title: shape.title,
                image: null, // Handle the case where the image could not be fetched
                color: predefinedColor[index], // or any default color or fetch from the document if available
                bg: predefinedBg[index], // or any default background color or fetch from the document if available
              };
            }
          })
        );
        setData(shapesData);
        console.log('Shapes Data:', shapesData);
      } catch (error) {
        console.error('Error fetching shapes data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      fetchShapesData();
    }
  }, [isFocused]);

  const renderCard = ({item}) => (
    <CardComponent
      title={item.title}
      onPress={() => {
        navigation.navigate("ShapeHome",{item:item})
      }}
      color={item.color}
      bg={item.bg}
      image={item.image}
    />
  );

  if (loading) {
    return (
      <ImageBackground
        style={[styles.background,{justifyContent:'center',alignContent:'center'}]}
        source={require('../../../assets/bg.jpg')}>
        <ActivityIndicator size="large" color="#0000ff" />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../../../assets/bg.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
        <Image
          source={require('../../../assets/panda.png')}
          style={styles.overlayImage}
        />
      </View>
      <TouchableOpacity
          style={styles.setting}
          onPress={() => {
            navigation.navigate('English');
          }}>
          <Image
            source={require('../../../assets/back.png')}
            style={styles.settingimg}
          />
        </TouchableOpacity>
    </ImageBackground>
  );
};

export default Shape;

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
  overlayImage: {
    position: 'absolute',
    bottom: 10,
    left: 100,
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
