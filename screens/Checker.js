import React, {useContext, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {Context} from '../context/AuthContext';

const Checker = () => {
  const {tryLocalSignIn} = useContext(Context);

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Checker;
