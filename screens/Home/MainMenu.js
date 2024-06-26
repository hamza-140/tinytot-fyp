import React, {useState, useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import SoundPlayer from 'react-native-sound-player';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Sound from 'react-native-sound';
import Card from '../../components/Card';
import {Context} from '../../context/AuthContext';
import SideMenu from 'react-native-side-menu-updated';
import Menu from './Menu'; // Adjust the import based on your file structure
import CardComponent from '../../components/CardComponent';
import auth from '@react-native-firebase/auth';

const MainMenu = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const {signout} = useContext(Context);
  const [kidName, setKidName] = useState('');
  const [sound, setSound] = useState(null);
  const [simg, setSimg] = useState(require('../../assets/soundOn.png'));
  const [setting, setSetting] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to control the side menu

  // useEffect(() => {
  //   try {
  //     // play the file tone.mp3
  //     // SoundPlayer.playSoundFile('tone', 'mp3')
  //     // // or play from url

  //     // or play file from folder
  //     if (isFocused) {
  //       SoundPlayer.playAsset(require('../../assets/sounds/bgm.mp3'));
  //     }
  //   } catch (e) {
  //     console.log(`cannot play the sound file`, e);
  //   }
  // }, []);
  const start = id => {
    if (id == 1) {
      //      sound.stop();
      setSimg(require('../../assets/soundOff.png'));
      navigation.navigate('English');
      SoundPlayer.stop();
    } else if (id == 2) {
      ////      sound.stop();
      setSimg(require('../../assets/soundOff.png'));
      navigation.navigate('Math');
    } else if (id == 3) {
      //      sound.stop();
      setSimg(require('../../assets/soundOff.png'));
      navigation.navigate('Islamic');
    } else if (id == 4) {
      //      sound.stop();
      setSimg(require('../../assets/soundOff.png'));
      navigation.navigate('Workbook');
    } else if (id == 5) {
      //      sound.stop();
      setSimg(require('../../assets/soundOff.png'));
      navigation.navigate('Workbook');
    } else {
      //      sound.stop();
      setSimg(require('../../assets/soundOff.png'));
      navigation.navigate('Profile');
    }
  };
  const [kidInfo, setKidInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  // const {signout} = useContext(Context);
  [imageSrc, setImageSrc] = useState(
    require('../../assets/images/avatars/bear.png'),
  );
  // const navigation = useNavigation();

  useEffect(() => {
    const fetchKidInfo = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const parentRef = firestore()
            .collection('parents')
            .doc(currentUser.uid);
          const parentDoc = await parentRef.get();
          if (parentDoc.exists) {
            const parentData = parentDoc.data();
            const kidInfoFromParent = parentData.kidInfo;
            if (kidInfoFromParent) {
              console.log(kidInfoFromParent);
              setKidInfo(kidInfoFromParent);
            } else {
              console.log('Kid info not found in parent document');
            }
          } else {
            console.log('Parent document not found');
          }
        } else {
          console.log('User not logged in');
        }
      } catch (error) {
        console.log('Error fetching kid info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKidInfo();
  }, [isFocused]);
  useEffect(() => {
    if (kidInfo?.avatarNo) {
      switch (kidInfo.avatarNo) {
        case 1:
          setImageSrc(require('../../assets/images/avatars/bear.png'));
          break;
        case 2:
          setImageSrc(require('../../assets/images/avatars/dog.png'));
          break;
        case 3:
          setImageSrc(require('../../assets/images/avatars/fox.png'));
          break;
        case 4:
          setImageSrc(require('../../assets/images/avatars/penguin.png'));
          break;
        default:
          setImageSrc(require('../../assets/images/avatars/bear.png'));
          break;
      }
    }
  }, [kidInfo]);
  // useEffect(() => {
  //   // Load the sound file only once when the component mounts
  //   const soundObject = new Sound('bg_sound.mp3', Sound.MAIN_BUNDLE, error => {
  //     if (error) {
  //       console.error('Error loading sound', error);
  //       return;
  //     }

  //     // Set the sound object
  //     setSound(soundObject);

  //     // Set the number of loops
  //     soundObject.setNumberOfLoops(-1); // -1 means infinite loop

  //     // Play the sound
  //     soundObject.play();
  //   });

  //   // Unload the sound when the component is unmounted
  //   return () => {
  //     if (sound) {
  // //      sound.stop();
  //       sound.release();
  //       setSound(null);
  //     }
  //   };
  // }, []);

  const handleToggleSoundButtonPress = () => {
    if (sound) {
      if (sound.isPlaying()) {
        //      sound.stop();
        setSimg(require('../../assets/soundOff.png'));
      } else {
        // If sound is not playing, start it
        sound.play();
        setSimg(require('../../assets/soundOn.png'));
      }
    }
  };

  const data = [
    {id: '1', title: 'English', color: '#FE9D50', bg: '#FEDABC'},
    {id: '2', title: 'Math', color: '#A51AC7', bg: '#E77DFE'},
    {id: '3', title: 'Islamic', color: '#2ECD70', bg: '#A5FECA'},
    {id: '4', title: 'Workbook', color: '#0057A7', bg: '#D6EAF8'},
  ];

  const renderCard = ({item}) => (
    // <Card letter={item.title} onPress={() => start(item.id)} heading1={true} />
    <CardComponent
      title={item.title}
      onPress={() => {
        start(item.id);
      }}
      color={item.color}
      id={item.id}
      bg={item.bg}
    />
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SideMenu
      menu={<Menu navigation={navigation} />} // The Menu component
      isOpen={isOpen}
      onChange={isOpen => setIsOpen(isOpen)}
      menuPosition="right"
      openMenuOffset={150} // Set the width of the menu here
      edgeHitWidth={60} // Edge distance to open the menu
    >
      <ImageBackground
        source={require('../../assets/bg.jpg')}
        style={styles.background}>
        <View style={styles.container}>
          {/* <Button title="Toggle Menu" onPress={toggleMenu} /> */}
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
            // onPress={() => {
            //   setSetting(true);
            // }}>
            onPress={() => {
              toggleMenu();
            }}>
            <Image source={imageSrc} style={styles.settingimg} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sound}
            onPress={handleToggleSoundButtonPress}>
            {/* <Image source={simg} style={styles.soundimg} /> */}
            <View style={styles.logoContainer}>
              <Text style={styles.star}>🐼</Text>
              <View style={styles.appNameContainer}>
                <Text style={styles.appName}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'PFSquareSansPro-Bold-subset',
                    }}>
                    TINYTOT
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SideMenu>
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
    paddingBottom: 4,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
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
    left: 0,
  },
  soundimg: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
});
