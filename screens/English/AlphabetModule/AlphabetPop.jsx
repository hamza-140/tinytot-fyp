import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AlphabetPop = ({ route }) => {
  const { letter } = route.params;
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const fetchBubbles = async () => {
      const bubblesRef = firestore().collection('bubbles');
      const snapshot = await bubblesRef.where('letter', '==', letter).get();
      const bubblesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBubbles(bubblesData);
    };

    fetchBubbles();
  }, [letter]);

  const handlePop = async (id, char) => {
    if (char.toUpperCase() === letter.toUpperCase()) {
      setBubbles(bubbles.map(bubble => bubble.id === id ? { ...bubble, popped: true } : bubble));
      await firestore().collection('bubbles').doc(id).update({ popped: true });
    } else {
      Alert.alert('Wrong Letter', `This is not the letter ${letter}. Try again!`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pop the bubbles with the letter {letter}</Text>
      <View style={styles.bubbleContainer}>
        {bubbles.map(bubble => (
          <TouchableOpacity
            key={bubble.id}
            style={[styles.bubble, bubble.popped ? styles.bubblePopped : null]}
            onPress={() => handlePop(bubble.id, bubble.char)}
            disabled={bubble.popped}
          >
            <Text style={styles.bubbleText}>{bubble.popped ? '' : bubble.char}</Text>
          </TouchableOpacity>
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  bubbleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  bubble: {
    width: 60,
    height: 60,
    margin: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#add8e6',
  },
  bubblePopped: {
    backgroundColor: '#ffcccb',
  },
  bubbleText: {
    fontSize: 24,
  },
});

export default AlphabetPop;
