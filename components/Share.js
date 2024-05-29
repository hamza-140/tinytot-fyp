// App.js

import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.score}>SCORE 250</Text>
      <Text style={styles.level}>LEVEL 07</Text>

      <View style={styles.gameContainer}>
        <View style={styles.lettersColumn}>
          <Text style={styles.letter}>A</Text>
          <Text style={styles.letter}>B</Text>
          <Text style={styles.letter}>C</Text>
          <Text style={styles.letter}>D</Text>
        </View>

        <View style={styles.spacer} />

        <View style={styles.lettersColumn}>
          <Text style={styles.letterRight}>b</Text>
          <Text style={styles.letterRight}>c</Text>
          <Text style={styles.letterRight}>a</Text>
          <Text style={styles.letterRight}>d</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingTop: 20,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F90',
    marginBottom: 5,
  },
  level: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F90',
    marginBottom: 20,
  },
  gameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  lettersColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  letter: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFA500',
    marginVertical: 10,
  },
  letterRight: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00F',
    marginVertical: 10,
  },
  spacer: {
    width: windowWidth * 0.2, // Adjust width as needed
  },
});

export default App;
