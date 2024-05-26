import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const placeholderImage = require('../../../assets/images/dog.png');

const AnimalCard = ({name, image, bg, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.card, {backgroundColor: bg}]}
      onPress={onPress}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Animals() {
  const navigation = useNavigation();
  const [animalData, setAnimalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const animalCollection = await firestore().collection('animals').get();
        const animalList = [];

        for (const doc of animalCollection.docs) {
          const {title, description, bg} = doc.data();

          const imageUrl = await storage()
            .ref(`animals/${title.toLowerCase()}.png`)
            .getDownloadURL();
          const soundUrl = await storage()
            .ref(`sounds/${title.toLowerCase()}.mp3`)
            .getDownloadURL();

          animalList.push({
            name: title,
            description,
            bg,
            image: {uri: imageUrl},
            soundUrl,
          });
        }

        setAnimalData(animalList);
      } catch (error) {
        console.error('Error fetching animal data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimalData();
  }, []);

  const navigateToDetail = animalDetails => {
    navigation.navigate('AnimalDetails', animalDetails);
  };

  const renderAnimalCards = () => {
    return animalData.map((animal, index) => (
      <AnimalCard
        key={index}
        name={animal.name}
        image={animal.image || placeholderImage}
        bg={animal.bg}
        onPress={() =>
          navigateToDetail({
            name: animal.name,
            description: animal.description,
            image: animal.image,
            soundUrl: animal.soundUrl,
            bg: animal.bg,
          })
        }
      />
    ));
  };

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
      style={styles.background}
      source={require('../../../assets/bg.jpg')}>
        <TouchableOpacity
            style={styles.sound}
            onPress={()=>{console.log("Pressed")}}>
            {/* <Image source={simg} style={styles.soundimg} /> */}
            <View style={styles.logoContainer}>
            <TouchableOpacity
          style={[styles.setting,{marginLeft:-40}]}
          onPress={() => {
            navigation.navigate('English');
          }}>
          <Image
            source={require('../../../assets/back.png')}
            style={styles.settingimg}
          />
        </TouchableOpacity>
        <View style={[styles.appNameContainer,{marginLeft:-30}]}>
          <Text style={styles.appName}>
            <Text style={{color:'white',fontFamily:'PFSquareSansPro-Bold-subset' }}>Animals</Text>
          </Text>
        </View>
      </View>
          </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.gridContainer}>{renderAnimalCards()}</View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  setting: {
    position: 'relative',
    top: 0,
    left: 0,
  },
  settingimg: {
    width: 130,
    height: 60,
    resizeMode: 'cover',
  },
  container: {
    padding: 10,
  },
  sound: {
    position: 'relative',
    top: 0,
    right: 0,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: '#A5D32F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomRightRadius: 12,
    // borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  appNameContainer: {
    backgroundColor: '#A5D32F',
    borderBottomRightRadius: 8,
    overflow: 'hidden',
  },
  star: {
    fontSize: 22,
    color: '#FFD700',
    marginRight: 8,
    paddingBottom:4
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'PFSquareSansPro-Bold-subset',
    marginBottom: 5,
    alignSelf: 'flex-end',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
