// Card.js
import React, { useEffect, useState } from 'react';
import {View, Text, Image, TouchableOpacity,Dimensions } from 'react-native';
const win = Dimensions.get('window');

const ShapeMenu = ({letter, color,onPress, img, status,imageURI, bg}) => {
  const [wid,setWid] = useState(0)
  const [hei,setHei] = useState(0)
  const [ratio,setRatio] = useState(0)

  const [imgSrc,setImgSrc] = useState(require('../assets/images/menu/animals.png'))
  useEffect(()=>{
    Image.getSize(imageURI, (width, height) => {setWid(width)});
    Image.getSize(imageURI, (width, height) => {setHei(height)});
    switch(Number(img)){
      case 1:
        setImgSrc(require("../assets/images/menu/lesson.png"))
        break;
      case 2:
        setImgSrc(require("../assets/images/menu/phonics.png"))
        break;
      case 3:
        setImgSrc(require("../assets/images/menu/shape.png"))
        break;
      case 4:
        setImgSrc(require("../assets/images/menu/animals.png"))
      break;
      default:
        setImgSrc(imgSrc)
        break
    }
  },[])
 
  

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card,{backgroundColor:bg}]}>
    <View style={styles.cardContent}>
    <TouchableOpacity
        style={[styles.button, {backgroundColor: color}]}>
        <Text style={styles.cardTitle}>{letter}</Text>
      </TouchableOpacity>
            <View style={styles.imageContainer}>
            <Image
          source={imageURI ? {uri: imageURI} : imgSrc}
          style={{height:hei,width:wid}}
          />
            </View>
          </View>
      </TouchableOpacity>
  );
};

export default ShapeMenu;

const cardWidth = '90%';
const cardMarginHorizontal = 20;

const styles = {
  card: {
    width: cardWidth,
    height: 250,
    // backgroundColor: '#FEDABC',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginLeft:50,
    marginRight:50,
    padding: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 30,
    textTransform:'capitalize',
    color: '#fff',
    fontFamily:'PFSquareSansPro-Bold-subset',
    
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  cardImage: {
    width:300,
    height: 150,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: 180,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
  },
};
