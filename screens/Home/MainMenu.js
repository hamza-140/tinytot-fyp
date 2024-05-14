import React, {useState, useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';

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
import AwesomeAlert from 'react-native-awesome-alerts';
import Sound from 'react-native-sound';
import Card from '../../components/Card';
import {Context} from '../../context/AuthContext';
const MainMenu = ({navigation, route}) => {
  const {signout} = useContext(Context);
  const [kidName, setKidName] = useState('');
  // useEffect(() => {
  //   const fetchKidName = async () => {
  //     try {
  //       const documentSnapshot = await firestore()
  //         .collection('kidProfiles') // Replace 'yourCollection' with the actual name of your collection
  //         .doc('4pagNngyngfezNgUiwTG')
  //         .get();

  //       if (documentSnapshot.exists) {
  //         const data = documentSnapshot.data();
  //         const kidNameValue = data.kidName;
  //         setKidName(kidNameValue);
  //       } else {
  //         console.log('Document does not exist');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching document: ', error);
  //     }
  //   };

  //   fetchKidName();
  // }, []);
  const [sound, setSound] = useState(null);
  const [simg, setSimg] = useState(require('../../assets/soundOn.png'));
  const start = id => {
    if (id == 1) {
      sound.stop();
      setSimg(require('../../assets/soundOff.png'));
      navigation.navigate('EnglishLesson');
    } else if (id == 2) {
      sound.stop();
      setSimg(require('../../assets/soundOff.png'));
      navigation.navigate('MathLesson');
    } else if (id == 3) {
      sound.stop();
      setSimg(require('../../assets/soundOff.png'));
      navigation.navigate('Islamic');
    } else if (id == 4) {
      sound.stop();
      setSimg(require('../../assets/soundOff.png'));
      navigation.navigate('Profile');
    } else if (id == 5) {
      sound.stop();
      setSimg(require('../../assets/soundOff.png'));
      navigation.navigate('Workbook');
    } else {
      sound.stop();
      setSimg(require('../../assets/soundOff.png'));
      navigation.navigate('Profile');
    }
  };
  useEffect(() => {
    // Load the sound file only once when the component mounts
    const soundObject = new Sound('bg_sound.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.error('Error loading sound', error);
        return;
      }

      // Set the sound object
      setSound(soundObject);

      // Set the number of loops
      soundObject.setNumberOfLoops(-1); // -1 means infinite loop

      // Play the sound
      soundObject.play();
    });

    // Unload the sound when the component is unmounted
    return () => {
      if (sound) {
        sound.stop();
        sound.release();
        setSound(null);
      }
    };
  }, []);

  const handleToggleSoundButtonPress = () => {
    if (sound) {
      if (sound.isPlaying()) {
        sound.stop();
        setSimg(require('../../assets/soundOff.png'));
      } else {
        // If sound is not playing, start it
        sound.play();
        setSimg(require('../../assets/soundOn.png'));
      }
    }
  };
  const [setting, setSetting] = useState(false);
  const data = [
    {id: '1', title: 'English'},
    {id: '2', title: 'Math'},
    {id: '3', title: 'Islamic'},
    {id: '4', title: 'Profile'},
    {id: '5', title: 'Workbook'},
  ];

  const renderCard = ({item}) => (
    <Card letter={item.title} onPress={() => start(item.id)} heading1={true} />
  );

  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={data}
          horizontal
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
            setSetting(true);
          }}>
          <Image
            source={require('../../assets/settings.png')}
            style={styles.settingimg}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sound}
          onPress={handleToggleSoundButtonPress}>
          <Image source={simg} style={styles.soundimg} />
        </TouchableOpacity>
        <AwesomeAlert
          show={setting}
          showProgress={false}
          title="Settings"
          message={`Do you want to exit?`}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No"
          confirmText="Yes"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            setSetting(false);
          }}
          onConfirmPressed={() => {
            sound.stop();
            setSimg(require('../../assets/soundOff.png'));
            signout();
            // BackHandler.exitApp();
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default MainMenu;

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
    right: 5,
  },
  settingimg: {
    width: 60,
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
