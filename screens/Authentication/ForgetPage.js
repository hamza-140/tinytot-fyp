import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import * as yup from 'yup';

const ForgetPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      setEmail('');
      showMessage({
        message: 'Password Reset Email Sent',
        description: 'Please check your email for further instructions.',
        type: 'success',
      });
    } catch (error) {
      showMessage({
        message: 'Error',
        description: error.message,
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/screen.png')} // Replace with your logo URL
          style={styles.logo}
        />
        <Text style={styles.companyName}>Welcome to Tinytot!</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.loginText}>Forget Password?</Text>
        <Text style={styles.signInText}>
          Click below to reset your password.
        </Text>
        <TextInput
          placeholder="Email"
          inputMode="email"
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TouchableOpacity onPress={handleResetPassword} style={styles.button}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ShareMe');
          }}>
          <Text style={styles.forgotPassword}>Return to Login</Text>
        </TouchableOpacity>
      </View>
      <FlashMessage position="top" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F2F2', // Background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006666',
  },
  body: {
    flex: 2,
    width: '80%',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#006666',
    marginBottom: 10,
  },
  signInText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#004d4d',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#004d4d',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default ForgetPage;
