import React, {useState, useEffect, useCallback} from 'react';
import {
  Button,
  ActivityIndicator,
  View,
  Alert,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');
const extractVideoId = url => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+?v=))([^?&]+)/,
  );
  return match ? match[1] : null;
};
export default function SecondMath({letter, progress, setProgress}) {
  const [playing, setPlaying] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(height);
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Video has finished playing!');
    }
  }, []);
  useEffect(() => {
    console.log('inside vid:', letter);
    const fetchVideoUrl = async () => {
      try {
        const doc = await firestore()
          .collection('numberVideos')
          .doc(letter)
          .get();
        if (doc.exists) {
          const videoUrl = doc.data().url;
          const id = extractVideoId(videoUrl);
          console.log(id);
          if (id) {
            if (progress === 33) {
              setProgress(66);
            } else {
              setProgress(progress);
            }
            setVideoId(id);
          } else {
            console.error('No valid video ID found in the URL');
          }
        } else {
          console.error('No video URL found for this letter');
        }
      } catch (error) {
        console.error('Error fetching video URL:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoUrl();
  }, [letter]);
  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.playerWrapper}>
        {videoId ? (
          <YoutubePlayer
            height={height - 70}
            width={width - 70} // Specify width to prevent overflow and scrolling
            play={playing}
            videoId={'iee2TATGMyI'}
            onChangeState={onStateChange}
          />
        ) : (
          <View style={styles.errorContainer}>
            <Text style={{color: 'black'}}>
              No video available for this letter
            </Text>
          </View>
        )}
      </View>
      {/* <Button title={playing ? 'Pause' : 'Play'} onPress={togglePlaying} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90e0ef', // Background color for the entire screen
    padding: 20,
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
