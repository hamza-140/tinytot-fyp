// Card.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Card = ({  }) => {
  const imageSource = "A"
  const locked = true;
  const stars = 2;
  return (
    <View style={[styles.card, locked && styles.lockedCard]}>
      <Text style={{fontSize:100}}>{imageSource}</Text>
      {locked && (
        <View style={styles.lockOverlay}>
          <Icon name="lock" size={40} color="#ffffff" />
        </View>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 150,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffd700',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  lockedCard: {
    backgroundColor: '#a52a2a',
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  lockOverlay: {
    position: 'absolute',
    width: '100%',
    height: '70%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Card;
