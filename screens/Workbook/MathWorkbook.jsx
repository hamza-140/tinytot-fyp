import React from 'react';
import {Text, View} from 'react-native';

const MathWorkbook = ({completedLessons}) => {
  const total = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const filteredLessons = total.filter(lesson =>
    completedLessons.includes(lesson),
  );

  return (
    <View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {total.map((lesson, index) => (
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

export default MathWorkbook;
