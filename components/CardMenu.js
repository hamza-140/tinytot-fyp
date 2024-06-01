// Card.js
import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const CardMenu = ({letter, onPress, img, status, imageURI, bg}) => {
  const [imgSrc, setImgSrc] = useState(
    require('../assets/images/menu/animals.png'),
  );
  useEffect(() => {
    switch (Number(img)) {
      case 1:
        setImgSrc(require('../assets/images/menu/lesson.png'));
        break;
      case 2:
        setImgSrc(require('../assets/images/menu/phonics.png'));
        break;
      case 3:
        setImgSrc(require('../assets/images/menu/shape.png'));
        break;
      case 4:
        setImgSrc(require('../assets/images/menu/animals.png'));
        break;
      case 5:
        setImgSrc(require('../assets/images/menu/mathlesson.png'));
        break;
      case 6:
        setImgSrc(require('../assets/images/menu/add.png'));
        break;
      case 7:
        setImgSrc(require('../assets/images/menu/sub.png'));
        break;
      case 8:
        setImgSrc(require('../assets/images/menu/mul.png'));
        break;
      case 9:
        setImgSrc(require('../assets/images/menu/div.png'));
        break;
      default:
        setImgSrc(imgSrc);
        break;
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, {backgroundColor: bg}]}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{letter}</Text>
        <View style={styles.imageContainer}>
          <Image
            source={imageURI ? {uri: imageURI} : imgSrc}
            style={[styles.cardImage, {objectFit: 'contain'}]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardMenu;

const cardWidth = 500;
const cardMarginHorizontal = 20;

const styles = {
  card: {
    width: 300,
    height: 180,
    // backgroundColor: '#FEDABC',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginRight: 40,
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 35,
    color: '#fff',
    marginRight: 10,
    fontFamily: 'PFSquareSansPro-Bold-subset',

    // flexWrap: 'wrap', // Allow text to wrap to the next line
    // maxWidth: '80%', // Set a maximum width for the text to allow wrapping
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  cardImage: {
    width: 140,
    height: 140,
  },
};
