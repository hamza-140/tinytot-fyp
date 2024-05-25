import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity,ImageBackground, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CuteProgressBar from './CuteProgressBar';
import FirstComponent from './FirstComponent';
import SecondComponent from './SecondComponent';
import LastComponent from './LastComponent';
import AlphabetQuiz from './AlphabetQuiz';
import VideoLesson from './VideoLesson';
import LetterTracing from './LetterTracing';
import AlphabetMatching from './AlphabetMatching';  
import ShapeLesson from './ShapeLesson';
import ShapeDraw from './ShapeDraw';
import { Text } from 'react-native';

const ShapeHome = ({route, navigation}) => {
  const [progress, setProgress] = useState(0);
  const {item} = route.params;

  const updateFirestore = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const parentRef = firestore()
          .collection('parents')
          .doc(currentUser.uid);
        const parentDoc = await parentRef.get();
        const english = parentDoc.data().english;

        const keys = Object.keys(english).sort();
        const currentIndex = keys.indexOf(item);
        const nextItem =
          currentIndex < keys.length - 1 ? keys[currentIndex + 1] : null;

        const updates = {
          [`english.${item}.isCompleted`]: true,
        };

        if (nextItem) {
          updates[`english.${nextItem}.status`] = true;
        }

        await parentRef.update(updates);
        console.log(
          `Updated isCompleted for ${item} and status for ${nextItem}`,
        );
        // navigation.navigate('EnglishLesson');
      } else {
        console.log('User not logged in');
      }
    } catch (error) {
      console.log('Error updating Firestore:', error);
    }
  };

//   useEffect(() => {
//     if (progress === 100) {
//       updateFirestore();
//     }
//   }, [progress]);

  const [page, setPage] = useState(1);

  const renderComponent = () => {
    switch (page) {
      case 1:
        return (
          <ShapeLesson
            item={item}
          />
        );
        break;
      case 2:
        return <ShapeDraw svg={item.svg}/>; // Add VideoLesson component
        break;
      default:
        return null;
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < 2) {
      setPage(page + 1);
    }
  };

  return (
    <ImageBackground source={require('../../../assets/bg.jpg')} style={{flex: 1}}>
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.backButton}  onPress={handlePrevious} disabled={page === 1}>
          <Icon
            name="arrow-left"
            size={30}
            color={page === 1 ? 'gray' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext} disabled={page === 2}>
          <Icon
            name="arrow-right"
            size={30}
            color={page === 2 ? 'gray' : 'black'}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginBottom:50}}></View>
      {renderComponent()}
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 30,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  nextButton: {
    position: 'absolute',
    top: 10,
    right: 30,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
});

export default ShapeHome;
