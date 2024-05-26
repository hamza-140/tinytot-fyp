// Card.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LessonCard = ({title, status, onPress}) => {
  const locked = !status; // Determine if the card should be locked

  return (
    <TouchableOpacity disabled={locked} onPress={onPress}>
      <View style={[styles.card, locked && styles.lockedCard]}>
        <Text
          style={{fontSize: 100, fontFamily: 'PFSquareSansPro-Bold-subset'}}>
          {title.toUpperCase()}
        </Text>
        {locked && ( // Display lock icon when locked is true
          <View style={styles.lockOverlay}>
            <Icon name="lock" size={40} color="#ffffff" />
          </View>
        )}
      </View>
    </TouchableOpacity>
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
    shadowOffset: {width: 0, height: 5},
  },
  lockedCard: {
    backgroundColor: '#a52a2a',
  },
  lockOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LessonCard;
