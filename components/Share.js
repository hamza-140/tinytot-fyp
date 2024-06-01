import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import Voice from '@react-native-community/voice';

const VoiceTest = () => {
  const [recognized, setRecognized] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Set up the Voice listeners
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    // Clean up the Voice listeners on component unmount
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = e => {
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechEndHandler = e => {
    console.log('onSpeechEnd: ', e);
    setStarted('√');
  };

  const onSpeechResultsHandler = e => {
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  const onStartButtonPress = () => {
    Voice.start('en-US')
      .then(() => console.log('Started'))
      .catch(err => console.error(err));
  };

  const onStopButtonPress = () => {
    Voice.stop()
      .then(() => console.log('Stopped'))
      .catch(err => console.error(err));
  };

  return (
    <View style={styles.container}>
      <Button title="Start Recording" onPress={onStartButtonPress} />
      <Button title="Stop Recording" onPress={onStopButtonPress} />
      <View>
        {results.map((result, index) => (
          <Text key={`result-${index}`} style={styles.transcriptText}>
            {result}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  transcriptText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 8,
  },
});

export default VoiceTest;
