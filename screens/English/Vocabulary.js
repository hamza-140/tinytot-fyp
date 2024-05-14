import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/FontAwesome';

const Vocabulary = ({navigation}) => {
  const word = 'example';
  const definition =
    'a thing characteristic of its kind or illustrating a general rule';
  const exampleSentences = [
    'This is an example sentence.',
    'Here is another example sentence.',
  ];
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);

  const speakWord = () => {
    Tts.speak(word);
  };

  const handleNextExample = () => {
    setCurrentExampleIndex(prevIndex =>
      prevIndex === exampleSentences.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePreviousExample = () => {
    setCurrentExampleIndex(prevIndex =>
      prevIndex === 0 ? exampleSentences.length - 1 : prevIndex - 1,
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="backward" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.word}>{word}</Text>
      <Text style={styles.definition}>{definition}</Text>
      <TouchableOpacity onPress={speakWord}>
        <Text style={styles.pronunciation}>Pronounce</Text>
      </TouchableOpacity>
      <Text style={styles.example}>
        {exampleSentences[currentExampleIndex]}
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handlePreviousExample}>
          <Text style={styles.button}>Previous Example</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextExample}>
          <Text style={styles.button}>Next Example</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  word: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  definition: {
    fontSize: 18,
    marginBottom: 10,
  },
  pronunciation: {
    color: 'blue',
    marginBottom: 10,
  },
  example: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    color: 'blue',
  },
});

export default Vocabulary;
