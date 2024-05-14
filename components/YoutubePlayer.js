import React, {useState, useCallback, useRef} from 'react';
import {Button, View, Alert} from 'react-native';
// import YoutubePlayer from 'react-native-youtube-iframe';

export default function YouTubePlayer() {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <View>
      <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} />
    </View>
  );
}
