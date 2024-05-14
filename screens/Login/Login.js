/* 
                                                ============================
                                                | IMPORTS AND DEPENDENCIES |  
                                                ============================
*/

import React, {useContext, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {Context} from '../../context/AuthContext';

/* 
                                                ==================
                                                | LOGIN FUNCTION |  
                                                ==================
*/

const Login = ({navigation}) => {
  const {signin} = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /*
                                                ======================
                                                | CHECK EMAIL FORMAT |  
                                                ======================
*/

  const isEmailValid = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // const handleLogin = async () => {
  // try {
  // Perform your authentication logic (e.g., sign-in with email and password)
  // const response = await auth().signInWithEmailAndPassword(email, password);
  // await signin({email, password});
  // await Keychain.setGenericPassword('name', name);
  // Retrieve the user UID from the response
  // const userUid = response.user.uid;
  // const db = firebase.firestore();
  // const doc = await db.collection('kidProfiles').doc(userUid).get();
  // const kidName = doc.exists ? doc.data().kidName : null;

  // Set the kid's name in Keychain for later use
  // await Keychain.setGenericPassword('name', kidName);

  // Now, you can navigate to another screen and pass the user UID and kid's name as parameters
  // navigation.navigate('Main');

  // Now, you can navigate to another screen and pass the user UID as a parameter
  // navigation.navigate('KidProfile', {parentUid: userUid});
  // console.log(userUid);
  // } catch (error) {
  //   console.error('Authentication error:', error);
  // }
  // console.log(email);
  // console.log(password);
  // setEmail('');
  // setPassword('');
  // };

  return (
    <View style={styles.container}>
      <Animatable.Text animation="slideInDown" style={styles.title}>
        Parent Login
      </Animatable.Text>

      <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
        <Input
          value={email}
          inputMode="email"
          placeholder="Email"
          placeholderTextColor={'#fff'}
          onChangeText={text => setEmail(text)}
          style={{color: '#fff'}}
        />
        <Input
          value={password}
          placeholder="Password"
          placeholderTextColor={'#fff'}
          secureTextEntry
          onChangeText={text => setPassword(text)}
          style={{color: '#fff'}}
        />
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={500}>
        <Button
          disabled={!isEmailValid(email) || password.length < 6}
          title="Login"
          buttonStyle={styles.button}
          onPress={() => {
            signin({email, password});
            setEmail('');
            setPassword('');
          }}
        />
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              No Account?{}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}>
              Register Here!
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D27777',
    padding: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#42b0f4',
    borderRadius: 8,
  },
});

export default Login;
