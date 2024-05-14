/* 
                                                ============================
                                                | IMPORTS AND DEPENDENCIES |  
                                                ============================
*/

import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {Context} from '../../context/AuthContext';

/* 
                                                ===================
                                                | SIGNUP FUNCTION |  
                                                ===================
*/

const Signup = ({navigation}) => {
  const {signup} = useContext(Context);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isEmailValid = email => {
    // Simple email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Animatable.Text animation="slideInDown" style={styles.title}>
          Parent Registeration
        </Animatable.Text>
        <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
          <Input
            value={name}
            placeholder="Name"
            placeholderTextColor={'#fff'}
            onChangeText={text => setName(text)}
            style={{color: '#fff'}}
          />
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
            title="Register"
            buttonStyle={styles.button}
            onPress={() => {
              signup({name, email, password});
            }}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                Already have an account?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>
                Login Here!
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#D27777',
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D27777',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 16,
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
export default Signup;
