import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={{}}>
          <Image
            source={require('../assets/welcome-image.png')}
            style={styles.welcomeImage}
          />
        </TouchableOpacity>

        <Text style={styles.welcomeText}>Welcome to TinyTot</Text>
      </View>
    </View>
  );
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeImage: {
    width: 200,
    height: 200,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});
