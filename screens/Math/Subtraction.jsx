import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CuteProgressBar from '../English/AlphabetModule/CuteProgressBar';
import FirstComponent from '../English/AlphabetModule/FirstComponent';
// import AlphabetQuiz from './AlphabetQuiz';
import VideoLesson from '../English/AlphabetModule/VideoLesson';
import FirstMath from '../Math/MathModule/FirstMath';
import SecondMath from './MathModule/SecondMath';
import NumberTracing from './MathModule/NumberTracing';
import AdditionVideo from './AdditionVideo';
import DragGame from './DragGame';
import InProgress from './InProgress';
// import LetterTracing from './LetterTracing';
// import AlphabetMatching from './AlphabetMatching';

const Subtraction = ({route, navigation}) => {
  const [progress, setProgress] = useState(0);
  //   const {item} = route.params;
  const item = '0';

  const updateFirestore = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const parentRef = firestore()
          .collection('parents')
          .doc(currentUser.uid);
        const parentDoc = await parentRef.get();
        const math = parentDoc.data().addition;

        const keys = Object.keys(math).sort();
        const currentIndex = keys.indexOf(item);
        const nextItem =
          currentIndex < keys.length - 1 ? keys[currentIndex + 1] : null;

        const updates = {
          [`math.${item}.isCompleted`]: true,
        };

        if (nextItem) {
          updates[`math.${nextItem}.status`] = true;
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

  // useEffect(() => {
  //   if (progress === 100) {
  //     updateFirestore();
  //   }
  // }, [progress]);

  const [page, setPage] = useState(1);

  const renderComponent = () => {
    switch (page) {
      case 1:
        return (
          <AdditionVideo
            vidId={'lBfj-pm5kqc'}
            progress={progress}
            setProgress={setProgress}
          />
        );
      case 2:
        return (
          <InProgress
            // letter={item}
            setProgress={setProgress}
            progress={progress}
          />
        ); // Add VideoLesson component
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
    if (page < 3) {
      setPage(page + 1);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#90e0ef'}}>
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handlePrevious}
          disabled={page === 1}>
          <Icon
            name="arrow-left"
            size={30}
            color={page === 1 ? 'grey' : 'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          disabled={page === 2}>
          <Icon
            name="arrow-right"
            size={30}
            color={page === 2 ? 'gray' : 'white'}
          />
        </TouchableOpacity>
      </View>
      <CuteProgressBar value={progress} />
      {renderComponent()}
    </View>
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
    backgroundColor: '#ff9f1c',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  nextButton: {
    position: 'absolute',
    top: 10,
    right: 30,
    backgroundColor: '#ff9f1c',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
});

export default Subtraction;
