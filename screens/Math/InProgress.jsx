import React, {Component, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
// import {Image} from 'react-native-elements';

const InProgress = ({progress, setProgress}) => {
  useEffect(() => {
    setProgress(100);
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../../assets/progress.png')}
        style={{width: 250, height: 250}}></Image>
      <Text> In Progress </Text>
    </View>
  );
};

export default InProgress;
