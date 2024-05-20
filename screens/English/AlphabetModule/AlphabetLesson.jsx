import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../../../components/Card';
import Sound from 'react-native-sound';
import AlphabetGame from '../Alphabets/AlphabetGame';
import EnglishQuiz from '../EnglishQuiz';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CuteProgressBar from './CuteProgressBar';
const AlphabetLesson = ({ route, navigation }) => {
  const [progress, setProgress] = useState(0);

  const {item} = route.params;
  const updateFirestore = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const parentRef = firestore().collection('parents').doc(currentUser.uid);
        const parentDoc = await parentRef.get();
        const english = parentDoc.data().english;

        // Determine the keys in the 'english' map and find the current and next items
        const keys = Object.keys(english).sort();
        console.log(keys.sort())
        const currentIndex = keys.indexOf(item);
        const nextItem = currentIndex < keys.length - 1 ? keys[currentIndex + 1] : null;

        const updates = {
          [`english.${item}.isCompleted`]: true,
        };

        if (nextItem) {
          updates[`english.${nextItem}.status`] = true;
        }

        await parentRef.update(updates);
        console.log(`Updated isCompleted for ${item} and status for ${nextItem}`);
        navigation.navigate('EnglishLesson');
      } else {
        console.log('User not logged in');
      }
    } catch (error) {
      console.log('Error updating Firestore:', error);
    }
  };

  useEffect(() => {
    if (progress === 100) {
      updateFirestore();
    }
  }, [progress]);

  console.log(item);
  const FirstComponent = () => {
    const [sounds, setSounds] = useState({}); // Use an object to store sounds for each letter

    useEffect(() => {
      console.log(item);

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
          if (progress === 0) {
            setProgress(25);
          } else {
            setProgress(progress);
          }

          // Optionally, you can do something after the sound has finished playing
        });
      }
    };
    const imageMapping = {
      a: require('../../../assets/images/alphabetsImages/a.png'),
      b: require('../../../assets/images/alphabetsImages/b.png'),
      c: require('../../../assets/images/alphabetsImages/c.png'),
      d: require('../../../assets/images/alphabetsImages/d.png'),
      e: require('../../../assets/images/alphabetsImages/e.png'),
      f: require('../../../assets/images/alphabetsImages/f.png'),
      g: require('../../../assets/images/alphabetsImages/g.png'),
      h: require('../../../assets/images/alphabetsImages/h.png'),
      i: require('../../../assets/images/alphabetsImages/i.png'),
      j: require('../../../assets/images/alphabetsImages/j.png'),
      k: require('../../../assets/images/alphabetsImages/k.png'),
      l: require('../../../assets/images/alphabetsImages/l.png'),
      m: require('../../../assets/images/alphabetsImages/m.png'),
      n: require('../../../assets/images/alphabetsImages/n.png'),
      o: require('../../../assets/images/alphabetsImages/o.png'),
      p: require('../../../assets/images/alphabetsImages/p.png'),
      q: require('../../../assets/images/alphabetsImages/q.png'),
      r: require('../../../assets/images/alphabetsImages/r.png'),
      s: require('../../../assets/images/alphabetsImages/s.png'),
      t: require('../../../assets/images/alphabetsImages/t.png'),
      u: require('../../../assets/images/alphabetsImages/u.png'),
      v: require('../../../assets/images/alphabetsImages/v.png'),
      w: require('../../../assets/images/alphabetsImages/w.png'),
      x: require('../../../assets/images/alphabetsImages/x.png'),
      y: require('../../../assets/images/alphabetsImages/y.png'),
      z: require('../../../assets/images/alphabetsImages/z.png'),
    };

    return (
      <View style={{}}>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <Card
            status={false}
            letter={item}
            onPress={() => start(item)}
            imageSource={imageMapping[item]}
          />
        </View>
      </View>
    );
  };

  const SecondComponent = () => {
    useEffect(() => {
      // Start interval and save the interval ID
      const intervalId = setInterval(() => {
        // Update progress based on the previous state
        setProgress(50);
      }, 5000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures this effect runs only once

    return (
      
      <View
        style={{
          flex:1,
          justifyContent: 'center'
        }}>
        
        <AlphabetGame />
      </View>
    );
  };

  const LastComponent = () => {
    useEffect(() => {
      // Start interval and save the interval ID
      const intervalId = setInterval(() => {
        // Update progress based on the previous state
        setProgress(100);
      }, 5000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures this effect runs only once

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <EnglishQuiz />
      </View>
    );
  };
  const [page, setPage] = useState(1);

  const renderComponent = () => {
    switch (page) {
      case 1:
        return <FirstComponent />;
      case 2:
        return <SecondComponent />;
      case 3:
        return <LastComponent />;
      default:
        return null;
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < 3) {
      setPage(page + 1);
    }
  };

  return (
    <View style={{flex: 1}}>
      <CuteProgressBar value={progress}/>
      {renderComponent()}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity onPress={handlePrevious} disabled={page === 1}>
          <Icon
            name="arrow-left"
            size={30}
            color={page === 1 ? 'gray' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} disabled={page === 3}>
          <Icon
            name="arrow-right"
            size={30}
            color={page === 3 ? 'gray' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AlphabetLesson;
