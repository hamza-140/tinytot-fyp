import React, {useContext} from 'react';
import {Button, Text} from 'react-native';
import {View} from 'react-native';
import {Context} from '../context/AuthContext';
import Tts from 'react-native-tts';

const LetterTracing = () => {
  const {signout} = useContext(Context);
  const tts = () => {
    Tts.speak('Hello!', {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.5,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  };
  return (
    <View>
      <Text style={{color: 'black'}}>Hekko</Text>
      <Text>Account Screen</Text>

      <Button title="Sign Out" onPress={signout}></Button>
    </View>
  );
};

export default LetterTracing;
