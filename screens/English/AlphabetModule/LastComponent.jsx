import React, { useEffect } from 'react';
import { View } from 'react-native';
import EnglishQuiz from '../EnglishQuiz';

const LastComponent = ({ setProgress }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress(100);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <EnglishQuiz />
    </View>
  );
};

export default LastComponent;
