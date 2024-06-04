import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Card from '../../../components/Card';
import Sound from 'react-native-sound';
import Tts from 'react-native-tts';
import LottieView from 'lottie-react-native';

const FirstMath = ({item, setProgress, progress}) => {
  console.log(item);
  const [sounds, setSounds] = useState({});

  useEffect(() => {
    setTimeout(() => {
      Tts.speak('Click On the Screen!');
    }, 1000);
  }, []);

  const start = letter => {
    if (letter) {
      Tts.speak(letter);
      if (progress === 0) {
        setProgress(25);
      } else {
        setProgress(progress);
      }
    }
  };

  const imageMapping = {
    0: require('../../../assets/images/num/0.png'),
    1: require('../../../assets/images/num/1.png'),
    2: require('../../../assets/images/num/2.png'),
    3: require('../../../assets/images/num/3.png'),
    4: require('../../../assets/images/num/4.png'),
    5: require('../../../assets/images/num/5.png'),
    6: require('../../../assets/images/num/6.png'),
    7: require('../../../assets/images/num/7.png'),
    8: require('../../../assets/images/num/8.png'),
    9: require('../../../assets/images/num/9.png'),
  };

  return (
    <View style={{display: 'flex', alignItems: 'center', marginTop: 20}}>
      <Card
        status={false}
        letter={item}
        onPress={() => start(item)}
        imageSource={imageMapping[item]}
      />
      <LottieView
        source={require('../../../assets/animations/panda.json')}
        autoPlay
        loop={true}
        style={styles.animation}
      />
    </View>
  );
};

export default FirstMath;

const styles = StyleSheet.create({
  animation: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 110,
    height: 110,
    zIndex: 1,
  },
});
