import React, {useContext} from 'react';
import {Button, Text} from 'react-native';
import {View} from 'react-native';
import {Context} from '../../context/AuthContext';

const Tracing = () => {
  const {signout} = useContext(Context);
  return (
    <View>
      <Text>Account Screen</Text>

      <Button title="Sign Out" onPress={signout}></Button>
    </View>
  );
};

export default Tracing;
