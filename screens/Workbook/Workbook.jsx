import React from 'react';
import { Text, View } from 'react-native';

const Workbook = ({ completedLessons }) => {
  const total =  [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ];
  const filteredLessons = total.filter(lesson => completedLessons.includes(lesson));

  return (
    <View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {total.map((lesson, index) => (
          <View
            key={index}
            style={{
              backgroundColor: completedLessons.includes(lesson) ? 'green' : 'purple',
              margin: 4,
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 25
            }}>
            <Text style={{ margin: 5, color: 'white' }}>{lesson}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Workbook;
