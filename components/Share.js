import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {Input} from 'react-native-elements';
import * as yup from 'yup';
import FlashMessage, {showMessage} from 'react-native-flash-message';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const App = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const handleSubmit = async () => {
    try {
      // Validate the form values
      await validationSchema.validate({email, password}, {abortEarly: false});

      // Handle successful form submission
      showMessage({
        message: 'Login Successful',
        type: 'success',
      });
      console.log('Form submitted successfully!');
    } catch (err) {
      // Set validation errors
      const errors = {};
      err.inner.forEach(e => {
        errors[e.path] = e.message;
      });
      setErrors(errors);
      showMessage({
        message: 'Please fix the errors below',
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/screen.png')}
          style={styles.logo}
        />
        <Text style={styles.companyName}>Welcome to Tinytot!</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.loginText}>Login</Text>
        <Text style={styles.signInText}>Sign in to continue</Text>
        <Input
          inputContainerStyle={{borderBottomWidth: 0, marginBottom: 0}}
          placeholder="Email"
          inputMode="email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          errorMessage={errors.email}
        />
        <Input
          inputContainerStyle={{borderBottomWidth: 0}}
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          errorMessage={errors.password}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Forget');
          }}>
          <Text style={styles.forgotPassword}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
      <FlashMessage position="top" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F2F2',
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

export default App;
