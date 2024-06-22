import React, {useState, useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Alert,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');
const extractVideoId = url => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+?v=))([^?&]+)/,
  );
  return match ? match[1] : null;
};

export default function IslamLesson({route, navigation}) {
  const {item} = route.params;
  const [videoId, setVideoId] = useState(null);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const updateFirestore = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const parentRef = firestore()
          .collection('parents')
          .doc(currentUser.uid);
        const parentDoc = await parentRef.get();
        const islamiyat = parentDoc.data().islamiyat;

        const keys = Object.keys(islamiyat)
          .map(Number)
          .sort((a, b) => a - b);
        console.log('Keys:', keys); // Debugging log to check the keys array

        const currentIndex = keys.indexOf(Number(item));
        console.log('Current Index:', currentIndex); // Debugging log to check the current index

        const nextItem =
          currentIndex < keys.length - 1 ? keys[currentIndex + 1] : null;
        console.log('Next Item:', nextItem); // Debugging log to check the next item

        if (currentIndex === -1) {
          console.log('Item not found in islamiyat keys:', item);
          return;
        }

        const updates = {
          [`islamiyat.${item}.isCompleted`]: true,
        };

        if (nextItem !== null) {
          updates[`islamiyat.${nextItem}.status`] = true;
        }

        await parentRef.update(updates);
        console.log(
          `Updated isCompleted for ${item} and status for ${nextItem}`,
        );
        // navigation.navigate('EnglishLesson');
      } else {
        console.log('User not logged in');
      }
    } catch (error) {
      console.log('Error updating Firestore:', error);
    }
  };

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const doc = await firestore().collection('islamVideos').doc(item).get();
        if (doc.exists) {
          const videoUrl = doc.data().url;
          const id = extractVideoId(videoUrl);
          console.log(id);
          if (id) {
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
  }, [item]);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      updateFirestore();
      setShowCongratulations(true);
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
          onReady={() => setLoading(false)}
        />
      </View>
      <Modal
        visible={showCongratulations}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCongratulations(false)}>
        <TouchableWithoutFeedback onPress={() => setShowCongratulations(false)}>
          <View style={styles.modalContainer2}>
            <View style={styles.modalContent2}>
              <LottieView
                source={require('../../assets/animations/congratuations.json')}
                autoPlay
                duration={2500}
                loop={false}
                style={styles.animation}
                onAnimationFinish={() => {
                  setShowCongratulations(false);
                  navigation.navigate('Islamic');
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  modalContainer2: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent2: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 200,
    height: 200,
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
