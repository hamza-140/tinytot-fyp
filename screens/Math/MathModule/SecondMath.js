import React, {useState, useCallback} from 'react';
import {Button, View, Alert, StyleSheet, Dimensions} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
const {width, height} = Dimensions.get('window');

export default function SecondMath() {
  const [playing, setPlaying] = useState(false);
  console.log(height);
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.playerWrapper}>
        <YoutubePlayer
          height={height - 70}
          width={width - 70} // Specify width to prevent overflow and scrolling
          play={playing}
          videoId={'iee2TATGMyI'}
          onChangeState={onStateChange}
        />
      </View>
      {/* <Button title={playing ? 'Pause' : 'Play'} onPress={togglePlaying} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90e0ef', // Background color for the entire screen
    padding: 20,
  },
  playerWrapper: {
    marginTop: 10,
    width: width - 70, // Width of the player container to match the player width
    height: height - 70, // Height of the player container to match the player height
    backgroundColor: 'white', // Background color for the player container
    borderRadius: 10, // Rounded corners
    overflow: 'hidden', // Ensures the player doesn't overflow the container
    marginBottom: 20, // Space between the player and the button
    elevation: 3, // Adds shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: {width: 0, height: 2}, // Shadow offset for iOS
    shadowOpacity: 0.8, // Shadow opacity for iOS
    shadowRadius: 2, // Shadow radius for iOS
  },
});
