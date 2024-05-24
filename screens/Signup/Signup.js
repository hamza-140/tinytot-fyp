import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import Button from '../../components/Button';
import * as Animatable from 'react-native-animatable';
import { Context } from '../../context/AuthContext';

const Signup = ({ navigation }) => {
  const { signup, state } = useContext(Context);
  const errorMessage = state.errorMessage;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // State variable to track registration status

  const isEmailValid = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    // Clear previous error messages
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setPasswordConfirmError('');

    // Validation checks
    let hasError = false;
    if (name.trim() === '') {
      setNameError('Name is required');
      hasError = true;
    }
    if (!isEmailValid(email)) {
      setEmailError('Invalid email format');
      hasError = true;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      hasError = true;
    }
    if (password !== passwordConfirm) {
      setPasswordConfirmError('Passwords do not match');
      hasError = true;
    }

    if (!hasError) {
      // Set the registering state to true
      setIsRegistering(true);
      
      try {
        // Call signup function
        await signup({ name, email, password });
      } catch (error) {
        // If registration fails, set the registering state back to false
        setIsRegistering(false);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Animatable.Text animation="slideInDown" style={styles.title}>
          Parent Registration
        </Animatable.Text>
        <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
          <Input
            value={name}
            placeholder="Name"
            placeholderTextColor={'#fff'}
            onChangeText={text => setName(text)}
            style={{ color: '#fff' }}
          />
          {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

          <Input
            value={email}
            inputMode="email"
            placeholder="Email"
            placeholderTextColor={'#fff'}
            onChangeText={text => setEmail(text)}
            style={{ color: '#fff' }}
          />
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

          <Input
            value={password}
            placeholder="Password"
            placeholderTextColor={'#fff'}
            secureTextEntry
            onChangeText={text => setPassword(text)}
            style={{ color: '#fff' }}
          />
          {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

          <Input
            value={passwordConfirm}
            placeholder="Confirm Password"
            placeholderTextColor={'#fff'}
            secureTextEntry
            onChangeText={text => setPasswordConfirm(text)}
            style={{ color: '#fff' }}
          />
          {passwordConfirmError ? <Text style={styles.error}>{passwordConfirmError}</Text> : null}
        </Animatable.View>
        {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}

        <Animatable.View animation="fadeInUp" delay={500}>
          <Button
            title={isRegistering ? 'Registering' : 'Register'} // Button text changes based on isRegistering state
            onPress={handleSignup}
            isDisabled={!isEmailValid(email) || password.length < 6 || password !== passwordConfirm || name.trim() === ''}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" style={styles.inputContainer}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                Already have an account?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
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
    fontFamily: 'PFSquareSansPro-Bold-subset',
    marginBottom: 16,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default Signup;
