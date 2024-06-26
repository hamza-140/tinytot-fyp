import React, {useState, useCallback} from 'react';
import {
  Button,
  ActivityIndicator,
  View,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const {width, height} = Dimensions.get('window');

export default function AdditionVideo({vidId, progress, setProgress}) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  const videoId = vidId; // Static video ID

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const handleError = useCallback(error => {
    console.error('YouTube Player Error:', error);
    Alert.alert('Error', 'There was an error loading the video.');
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <View style={styles.playerWrapper}>
        <YoutubePlayer
          height={height - 70}
          width={width - 70}
          play={playing}
          videoId={videoId}
          onChangeState={onStateChange}
          onError={handleError}
          onReady={() => {
            if (progress < 50) {
              setProgress(50);
            }
            setLoading(false);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90e0ef',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerWrapper: {
    marginTop: 10,
    width: width - 70,
    height: height - 70,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
