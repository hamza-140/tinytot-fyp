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
import Sound from 'react-native-sound';
import Card from '../../components/Card';
import {firebase} from '@react-native-firebase/firestore';

const Alphabets = ({navigation}) => {
  const [sounds, setSounds] = useState({}); // Use an object to store sounds for each letter

  useEffect(() => {
    // Load sounds during component initialization
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const num = '0123456789';
    const loadedSounds = {};

    alphabet.split('').forEach(letter => {
      const soundPath = `${letter}.mp3`; // Adjust the path to your actual sound files

      const newSound = new Sound(soundPath, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.error(`Error loading sound for ${letter}`, error);
        } else {
          loadedSounds[letter] = newSound;
        }
      });
    });

    setSounds(loadedSounds);

    return () => {
      // Release all sounds when the component is unmounted
      Object.values(loadedSounds).forEach(loadedSound => {
        if (loadedSound) {
          loadedSound.release();
        }
      });
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const start = letter => {
    const sound = sounds[letter];
    if (sound) {
      // Play the specific sound for the clicked letter
      // sound.setSpeed(0.5);
      sound.play(() => {
        // Optionally, you can do something after the sound has finished playing
      });
    }
  };

  const alphabetData = Array.from('abcdefghijklmnopqrstuvwxyz').map(letter => ({
    id: letter,
    title: `${letter.toUpperCase()}${letter}`,
  }));
  const imageMapping = {
    a: require('../../assets/images/alphabetsImages/a.png'),
    b: require('../../assets/images/alphabetsImages/b.png'),
    c: require('../../assets/images/alphabetsImages/c.png'),
    d: require('../../assets/images/alphabetsImages/d.png'),
    e: require('../../assets/images/alphabetsImages/e.png'),
    f: require('../../assets/images/alphabetsImages/f.png'),
    g: require('../../assets/images/alphabetsImages/g.png'),
    h: require('../../assets/images/alphabetsImages/h.png'),
    i: require('../../assets/images/alphabetsImages/i.png'),
    j: require('../../assets/images/alphabetsImages/j.png'),
    k: require('../../assets/images/alphabetsImages/k.png'),
    l: require('../../assets/images/alphabetsImages/l.png'),
    m: require('../../assets/images/alphabetsImages/m.png'),
    n: require('../../assets/images/alphabetsImages/n.png'),
    o: require('../../assets/images/alphabetsImages/o.png'),
    p: require('../../assets/images/alphabetsImages/p.png'),
    q: require('../../assets/images/alphabetsImages/q.png'),
    r: require('../../assets/images/alphabetsImages/r.png'),
    s: require('../../assets/images/alphabetsImages/s.png'),
    t: require('../../assets/images/alphabetsImages/t.png'),
    u: require('../../assets/images/alphabetsImages/u.png'),
    v: require('../../assets/images/alphabetsImages/v.png'),
    w: require('../../assets/images/alphabetsImages/w.png'),
    x: require('../../assets/images/alphabetsImages/x.png'),
    y: require('../../assets/images/alphabetsImages/y.png'),
    z: require('../../assets/images/alphabetsImages/z.png'),
  };
  const renderCard = ({item}) => (
    <Card
      status={false}
      letter={item.id}
      onPress={() => start(item.id)}
      imageSource={imageMapping[item.id.toLowerCase()]}
    />
  );

  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={alphabetData}
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
            navigation.navigate('English');
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

export default Alphabets;

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
