import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AlphabetMatching = ({ letter,progress,setProgress }) => {
    // const {letter} = route.params;
    const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPair, setSelectedPair] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchPairs = async () => {
      try {
        const documentSnapshot = await firestore().collection('matchingPairs').doc(letter).get();
        if (documentSnapshot.exists) {
          const data = documentSnapshot.data();
          setPairs(data.pairs);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching pairs: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPairs();
  }, [letter]);

  const handleCardPress = (id) => {
    if (selectedPair.length < 2) {
      setSelectedPair([...selectedPair, id]);
      if (selectedPair.length === 1 && selectedPair[0] !== id) {
        const firstPair = pairs.find((p) => p.id === selectedPair[0]);
        const secondPair = pairs.find((p) => p.id === id);
        if (firstPair.match && secondPair.match && firstPair.char.toLowerCase() === secondPair.char.toLowerCase()) {
          setMatches([...matches, firstPair.id, secondPair.id]);
          Alert.alert('Match!', 'You found a match!');
          if(progress===60){
            setProgress(80)
          }
          else{
            setProgress(progress)
          }
        }
        setTimeout(() => setSelectedPair([]), 1000);
      }
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match the letters {letter}</Text>
      <View style={styles.grid}>
        {pairs.map((pair) => (
          <TouchableOpacity
            key={pair.id}
            style={[
              styles.card,
              selectedPair.includes(pair.id) || matches.includes(pair.id) ? styles.cardSelected : null,
            ]}
            onPress={() => handleCardPress(pair.id)}
            disabled={matches.includes(pair.id)}
          >
            <Text style={styles.letter}>{selectedPair.includes(pair.id) || matches.includes(pair.id) ? pair.char : '?'}</Text>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 60,
    height: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  cardSelected: {
    backgroundColor: '#cfc',
  },
  letter: {
    fontSize: 32,
  },
});

export default AlphabetMatching;
