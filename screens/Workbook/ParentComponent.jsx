import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Workbook from './Workbook'; // Assuming Workbook component is in a separate file
import {useNavigation} from '@react-navigation/native';
import CardComponent from '../../components/CardComponent';
const ParentComponent = () => {
  const [completedEnglishLessons, setCompletedEnglishLessons] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchCompletedEnglishLessons = async () => {
      try {
        const currentUser = await auth().currentUser;
        if (currentUser) {
          const parentRef = firestore()
            .collection('parents')
            .doc(currentUser.uid);
          const parentDoc = await parentRef.get();
          const english = parentDoc.data().english;

          // Filter out completed lessons
          const completedLessons = Object.keys(english)
            .filter(key => english[key].isCompleted)
            .sort();

          console.log(completedLessons);

          setCompletedEnglishLessons(completedLessons);
        } else {
          console.log('User not logged in');
        }
      } catch (error) {
        console.log('Error fetching completed English lessons:', error);
      }
    };

    fetchCompletedEnglishLessons();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <CardComponent
        title={'Goto Workbook'}
        color={'#2ECD70'}
        bg={'#A5FECA'}
        onPress={() => {
          navigation.navigate('Working');
        }}></CardComponent>

      <Workbook completedLessons={completedEnglishLessons} />
    </ScrollView>
  );
};

export default ParentComponent;
