import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Tts from 'react-native-tts';
import TrackPlayer, { State } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/AntDesign';

const AnimalDetails = ({ route }) => {
  const { name, description, image, soundUrl, bg } = route.params;

  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: '1',
        url: soundUrl,
        title: name,
        artist: 'Unknown',
      });
    };

    setupPlayer();

   
  }, [soundUrl, name]);

  const playSound = async () => {
    const state = await TrackPlayer.getPlaybackState();
    const currentTrack = await TrackPlayer.getActiveTrackIndex();

    if (currentTrack !== '1') {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: '1',
        url: soundUrl,
        title: name,
        artist: 'Unknown',
      });
    }

    if (state === State.Playing) {
      await TrackPlayer.pause();
      await TrackPlayer.seekTo(0);
    } else {
      await TrackPlayer.seekTo(0);
      await TrackPlayer.play();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <TouchableOpacity onPress={() => Tts.speak(name)}>
        <Image source={image} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity onPress={playSound}>
        <Icon name="sound" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default AnimalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'PFSquareSansPro-Bold-subset',
    marginBottom: 10,
    textTransform:'uppercase',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontFamily: 'PFSquareSansPro-Medium-subset',

  },
});
