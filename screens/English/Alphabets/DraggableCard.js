// DraggableCard.js

import React from 'react';
import { View, Text } from 'react-native';
import Draggable from 'react-native-draggable';

const DraggableCard = ({ label }) => {
  return (
    <Draggable>
      <View style={styles.card}>
        <Text style={styles.cardText}>{label}</Text>
      </View>
    </Draggable>
  );
};

const styles = {
  card: {
    width: 100,
    height: 50,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default DraggableCard;
