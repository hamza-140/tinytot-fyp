import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const CardComponent = ({title, color, onPress, image, id, bg}) => {
  const [imgSrc, setImageSrc] = useState(
    require('../assets/images/menu/workbook.png'),
  );

  useEffect(() => {
    if (id) {
      switch (Number(id)) {
        case 1:
          setImageSrc(require('../assets/images/menu/englishbook.png'));
          break;
        case 2:
          setImageSrc(require('../assets/images/menu/mathbook.png'));
          break;
        case 3:
          setImageSrc(require('../assets/images/menu/islambook.png'));
          break;
        case 4:
          setImageSrc(require('../assets/images/menu/workbook.png'));
          break;
        default:
          setImageSrc(imgSrc);
          break;
      }
    }
  }, [id]);

  return (
    <View style={[styles.card, {backgroundColor: bg}]}>
      <View style={styles.imageContainer}>
        <Image
          source={image ? {uri: image} : imgSrc}
          style={id==2 ? [styles.image,{marginTop:0}]:styles.image}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: color}]}
        onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 180,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginRight: 40,
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 180,
    marginTop:20,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 220,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
  },
  buttonText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'PFSquareSansPro-Bold-subset',
  },
});
