import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Card from '../../../components/Card';
import Sound from 'react-native-sound';
import Tts from 'react-native-tts';
import LottieView from 'lottie-react-native';
import CardMenu from '../../../components/CardMenu';
import ShapeMenu from '../../../components/ShapeMenu';

const ShapeLesson = ({ item}) => {
  const [sounds, setSounds] = useState({});

  useEffect(() => {
    setTimeout(() => {
      Tts.speak("Click On the Screen!");
    }, 1000);
    
      }, []);

  const start = letter => {
    Tts.speak(letter)
  };



  return (
    <View style={{ display: 'flex', alignItems: 'center',marginTop:20 }}>
      <ShapeMenu color={item.color} status={false} letter={item.title} onPress={() => start(item.title)} imageURI={item.image} bg={item.bg} />
      <LottieView
                source={require('../../../assets/animations/panda.json')}
                autoPlay
                loop={true}
                style={styles.animation}
                
              />
    </View>
  );
};

export default ShapeLesson;

const styles = StyleSheet.create({
  animation: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 110,
    height: 110,
    zIndex: 1,
  },
})