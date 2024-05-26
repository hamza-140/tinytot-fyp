import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Card from './Card'; // Import your Card component here
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LessonCard from './LessonCard';

const EnglishLesson = ({ navigation }) => {
  const [englishInfo, setEnglishInfo] = useState(null);

  useEffect(() => {
    const fetchEnglishInfo = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const parentRef = firestore().collection('parents').doc(currentUser.uid);
          const parentDoc = await parentRef.get();
          if (parentDoc.exists) {
            const parentData = parentDoc.data();
            const english = parentData.english;
            if (english) {
              // const filteredEnglish = Object.entries(english).filter(([key, value]) => value.status === true);
              setEnglishInfo(english);
              // console.log(english);
            } else {
              console.log('English info not found in parent doc');
            }
          } else {
            console.log('Parent document not found');
          }
        } else {
          console.log('User not logged in');
        }
      } catch (error) {
        console.log('Error fetching English info:', error);
      }
    };

    fetchEnglishInfo();
  }, [navigation]);

  const handleCardPress = (item) => {
    navigation.navigate('AlphabetLesson', { item: item });
    console.log(item);
  };

  // Function to render lesson cards
  const renderLessonCards = ({ item }) => (
    // <Card
    //   letter={item[0]} // Assuming item is an array of key-value pairs
    //   status={item[1].status}
    //   onPress={() => handleCardPress(item[0])}
    //   // Add other props as needed
    // />
    <LessonCard title={item[0]} status={item[1].status} onPress={()=>handleCardPress(item[0])}></LessonCard>
  );

  return (
    <ImageBackground
      source={require('../../../assets/bg.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={englishInfo ?  Object.entries(englishInfo).sort() : []}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderLessonCards}
          keyExtractor={(item, index) => index.toString()} // Use index as key for now
          contentContainerStyle={styles.flatListContainer}
        />
        <Image
          source={require('../../../assets/panda.png')}
          style={styles.overlayImage}
        />
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
      </View>
    </ImageBackground>
  );
};

export default EnglishLesson;

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
