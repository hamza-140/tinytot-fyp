import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
// import LessonCard from '../../English/Alphabets/LessonCard';
import LessonCard2 from '../English/Alphabets/LessonCard2';
// import Card from '../Card';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const MathLesson = ({navigation}) => {
  const [mathInfo, setmathInfo] = useState(null);

  useEffect(() => {
    const fetchmathInfo = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const parentRef = firestore()
            .collection('parents')
            .doc(currentUser.uid);
          const parentDoc = await parentRef.get();
          if (parentDoc.exists) {
            const parentData = parentDoc.data();
            console.log(parentData);
            const math = parentData.islamiyat;
            if (math) {
              console.log(math);
              setmathInfo(math);
            } else {
              console.log('math info not found in parent doc');
            }
          } else {
            console.log('Parent document not found.');
          }
        } else {
          console.log('User not logged in');
        }
      } catch (error) {
        console.log('Error fetching kid info:', error);
      }
    };

    fetchmathInfo();
  }, []);

  const handleCardPress = item => {
    navigation.navigate('IslamLesson', {item: item});
    console.log(item);
  };
  // Function to render lesson cards
  const renderLessonCards = ({item}) => (
    <LessonCard2
      title={item[0]}
      status={item[1].status}
      onPress={() => handleCardPress(item[0])}></LessonCard2>
  );

  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={mathInfo ? Object.entries(mathInfo) : []}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderLessonCards}
          keyExtractor={(item, index) => index.toString()} // Use index as key for now
          contentContainerStyle={styles.flatListContainer}
        />
        <Image
          source={require('../../assets/panda.png')}
          style={styles.overlayImage}
        />
        <TouchableOpacity
          style={styles.setting}
          onPress={() => {
            navigation.goBack();
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

export default MathLesson;

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
