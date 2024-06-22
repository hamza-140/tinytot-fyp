import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const IslamWorkbook = ({completedLessons}) => {
  const [totalLessons, setTotalLessons] = useState([]);

  useEffect(() => {
    const fetchTotalLessons = async () => {
      try {
        const querySnapshot = await firestore().collection('islamVideos').get();
        const lessons = [];
        querySnapshot.forEach(doc => {
          lessons.push(doc.id); // Collect the document IDs
        });
        setTotalLessons(lessons); // Update the state with the fetched IDs
      } catch (error) {
        console.error('Error fetching total lessons:', error);
      }
    };

    fetchTotalLessons();
  }, []);
  useEffect(() => {
    console.log(totalLessons);
  }, [totalLessons]);
  return (
    <View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {totalLessons
          .sort((a, b) => a - b)
          .map((lesson, index) => (
            <View
              key={index}
              style={{
                backgroundColor: completedLessons.includes(lesson)
                  ? 'green'
                  : 'purple',
                margin: 4,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25,
              }}>
              <Text style={{margin: 5, color: 'white'}}>{lesson}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export default IslamWorkbook;
