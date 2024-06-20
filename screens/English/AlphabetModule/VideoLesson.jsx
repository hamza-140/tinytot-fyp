import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import firestore from '@react-native-firebase/firestore';

const extractVideoId = url => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+?v=))([^?&]+)/,
  );
  return match ? match[1] : null;
};

const VideoLesson = ({letter, progress, setProgress}) => {
  const {width, height} = Dimensions.get('window');
  const videoHeight = height * 0.973; // 40% of the device height
  const videoWidth = width; // 90% of the device width
  const [playing, setPlaying] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const doc = await firestore()
          .collection('alphabetVideos')
          .doc(letter)
          .get();
        if (doc.exists) {
          const videoUrl = doc.data().url;
          const id = extractVideoId(videoUrl);
          console.log(id);
          if (id) {
            if (progress === 20) {
              setProgress(40);
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

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('Video has finished playing!');
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      {videoId ? (
        <YoutubePlayer
          height={videoHeight}
          width={videoWidth}
          play={playing}
          videoId={videoId}
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
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoLesson;
