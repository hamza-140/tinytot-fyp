import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
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
import {Context} from '../../context/AuthContext';

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

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const {signin, state} = useContext(Context);
  let errorMessage = state.errorMessage;
  const [err, setErr] = useState(errorMessage);
  const [isLoggingIn, setIsLoggingIn] = useState(false); // State variable to track login status

  const handleSubmit = async () => {
    try {
      // Validate the form values
      await validationSchema.validate({email, password}, {abortEarly: false});

      try {
        setIsLoggingIn(true);
        await signin({email, password});
        setErr(state.errorMessage);
      } catch (err) {
        console.log(err);
        setIsLoggingIn(false); // Reset logging in state if login fails
      }
      setEmail('');
      setPassword('');
      errorMessage('');
    } catch (err) {
      const errors = {};
      err.inner.forEach(e => {
        errors[e.path] = e.message;
      });
      setErrors(errors);
      showMessage({
        message: 'Please fix the errors below',
        type: 'danger',
      });
      setIsLoggingIn(false); // Reset logging in state if validation fails
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/screen.png')}
          style={styles.logo}
        />
        <Text style={styles.companyName}>Welcome to Tinytot!</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.loginText}>Parent Login</Text>
        <Text style={styles.signInText}>Sign in to continue</Text>
        <Input
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          placeholder="Email"
          inputMode="email"
          style={styles.input}
          value={email}
          onChangeText={e => {
            setErrors('');
            setErr('');
            setEmail(e);
          }}
          errorMessage={errors.email}
        />
        <Input
          inputContainerStyle={{borderBottomWidth: 0}}
          placeholder="Password"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={e => {
            setErrors('');
            setPassword(e);
            setErr('');
          }}
          errorMessage={errors.password}
        />
        {err ? <Text style={{color: 'red'}}>{err}</Text> : null}
        <TouchableOpacity
          style={[styles.button, isLoggingIn && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoggingIn}>
          <Text style={styles.buttonText}>
            {isLoggingIn ? 'Logging in...' : 'Log In'}
          </Text>
        </TouchableOpacity>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              setErrors('');
              setErr('');
              navigation.navigate('Signup');
            }}>
            <Text style={styles.forgotPassword}>Register Here</Text>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 20}}> || </Text>
          <TouchableOpacity
            onPress={() => {
              setErrors('');
              setErr('');
              navigation.navigate('Forget');
            }}>
            <Text style={styles.forgotPassword}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
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
    // marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#004d4d',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
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
  buttonDisabled: {
    backgroundColor: '#888888',
  },
  forgotPassword: {
    color: '#004d4d',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default Login;
