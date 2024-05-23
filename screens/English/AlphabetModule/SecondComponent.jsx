import React, { useEffect } from 'react';
import { View } from 'react-native';
import AlphabetMatching from './AlphabetMatching';

const SecondComponent = ({ item, setProgress }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress(50);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <AlphabetMatching letter={item.toUpperCase()} />
    </View>
  );
};

export default SecondComponent;
