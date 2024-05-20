import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

const CuteProgressBar = ({value}) => {
  const [progress] = useState(new Animated.Value(value));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: value,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [value]);

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>{value}%</Text>
      <View style={styles.progressBar}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: progress.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 50,
  },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FF6B6B',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
  },
  progressText: {
    color: 'black',
    marginBottom: 5,
  },
});

export default CuteProgressBar;
