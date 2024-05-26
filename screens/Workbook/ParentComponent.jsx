import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Workbook from './Workbook'; // Assuming Workbook component is in a separate file
import { useNavigation } from '@react-navigation/native';
const ParentComponent = () => {
  const [completedEnglishLessons, setCompletedEnglishLessons] = useState([]);
const navigation = useNavigation()
  useEffect(() => {
    const fetchCompletedEnglishLessons = async () => {
      try {
        const currentUser = await auth().currentUser;
        if (currentUser) {
          const parentRef = firestore().collection('parents').doc(currentUser.uid);
          const parentDoc = await parentRef.get();
          const english = parentDoc.data().english;

          // Filter out completed lessons
          const completedLessons = Object.keys(english)
            .filter(key => english[key].isCompleted)
            .sort();

            console.log(completedLessons)

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
    <View>
      <TouchableOpacity onPress={()=>{navigation.navigate("Working")}}>
      <Text style={{ color: 'blue', fontSize: 20 }}>Goto workbooks</Text>
      </TouchableOpacity>
      <Workbook completedLessons={completedEnglishLessons} />
    </View>
  );
};

export default ParentComponent;
