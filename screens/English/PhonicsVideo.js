import * as React from 'react';
import {Button, StyleSheet, TouchableOpacity, View} from 'react-native';
// import {VideoPlayerComponent} from 'react-native-videoplayer-fabric';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const PhonicsVideo = ({route, navigation}) => {
  const {fileName} = route.params;

  // Ref for VideoPlayerComponent
  const videoPlayerComponentRef = React.useRef(null);

  // Video URL state
  const [videoUri, setVideoUri] = React.useState(null);

  // Function to fetch video URL from Firebase Storage
  React.useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const url = await storage()
          .ref(`lessons/English/Phonics/Video/${fileName}`)
          .getDownloadURL();
        setVideoUri(url);
      } catch (error) {
        console.error('Error fetching video URL:', error);
        // Handle error
      }
    };

    fetchVideoUrl();
  }, [fileName]);

  return (
    <View style={styles.container}>
      {/* Video Player Component */}
      {
        videoUri
        // <VideoPlayerComponent
        //   ref={videoPlayerComponentRef}
        //   videoUrl={videoUri}
        //   style={styles.videoBox}
        // />
      }

      {/* Play Button */}
      <Button
        title="Play"
        onPress={() => {
          videoPlayerComponentRef.current?.play();
        }}
      />

      {/* Pause Button */}
      <Button
        title="Pause"
        onPress={() => {
          videoPlayerComponentRef.current?.pause();
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="backward" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  videoBox: {
    width: 300,
    height: 200,
    marginVertical: 20,
  },
});

export default PhonicsVideo;
