import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tts from 'react-native-tts';
const Phonics = ({navigation, route}) => {
  const [word, setWord] = useState('');
  const [letters, setLetters] = useState([]);
  useEffect(() => {
    // Convert the word into an array of letters
    setWord(route.params);
    setLetters(word.split(''));
  }, [word]);

  const handleLetterPress = index => {
    const newLetters = [...letters];
    const letterToSpeak = newLetters[index];
    newLetters.splice(index, 1);
    setLetters(newLetters);
    if (letterToSpeak) {
      speak(letterToSpeak);
    }
  };

  const handleSoundPress = () => {
    speak(word);
  };
  const speak = text => {
    Tts.speak(text);
  };

  const handleResetPress = () => {
    // Logic to reload the screen
    // For simplicity, let's just reset the state
    setWord(route.params);
    setLetters(route.params.split(''));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSoundPress}>
        <Text style={styles.sound}>{word.toUpperCase()}</Text>
      </TouchableOpacity>
      <View style={styles.lettersContainer}>
        {letters.map((letter, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleLetterPress(index)}
            style={styles.letter}>
            <Text>{letter.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={handleResetPress} style={styles.resetButton}>
        <Icon name="refresh" size={30} color="black" />
      </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  sound: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lettersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  resetButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});

export default Phonics;
