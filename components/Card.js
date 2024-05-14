// Card.js
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const Card = ({letter, onPress, imageSource, status, heading1}) => {
  const displayText = heading1 ? letter.toUpperCase() : letter.toUpperCase();
  const fontSize = displayText.length > 6 ? 80 : 120;

  return (
    <TouchableOpacity disabled={status} onPress={onPress}>
      <View style={styles.card}>
        <Text style={[styles.cardText, {fontSize}]}>{displayText}</Text>
        {imageSource && typeof imageSource === 'number' && (
          <Image source={imageSource} style={styles.cardImage} />
        )}
        {imageSource && typeof imageSource === 'string' && (
          <Image source={{uri: imageSource}} style={styles.cardImage} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const cardWidth = 500;
const cardMarginHorizontal = 20;

const styles = {
  card: {
    width: cardWidth,
    height: 250,
    backgroundColor: '#7ED7C1',
    borderWidth: 4,
    borderColor: '#DC8686',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: cardMarginHorizontal,
  },
  cardText: {
    fontFamily: 'Bubble Love Demo',
    color: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
};
