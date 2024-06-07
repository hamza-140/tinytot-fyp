import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Workbook from './Workbook'; // Assuming Workbook component is in a separate file
import {useNavigation} from '@react-navigation/native';
import CardComponent from '../../components/CardComponent';
const MathComponent = () => {
  const [completedMathLessons, setCompletedMathLessons] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchCompletedMathLessons = async () => {
      try {
        const currentUser = await auth().currentUser;
        if (currentUser) {
          const parentRef = firestore()
            .collection('parents')
            .doc(currentUser.uid);
          const parentDoc = await parentRef.get();
          const math = parentDoc.data().math;

          // Filter out completed lessons
          const completedLessons = Object.keys(math)
            .filter(key => math[key].isCompleted)
            .sort();

          console.log(completedLessons);

          setCompletedMathLessons(completedLessons);
        } else {
          console.log('User not logged in');
        }
      } catch (error) {
        console.log('Error fetching completed English lessons:', error);
      }
    };

    fetchCompletedMathLessons();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <CardComponent
        title={'Goto Workbook'}
        color={'#FE9D50'}
        bg={'#FEDABC'}
        onPress={() => {
          navigation.navigate('Working');
        }}></CardComponent>

      <Workbook completedLessons={completedMathLessons} />
    </ScrollView>
  );
};

export default MathComponent;
