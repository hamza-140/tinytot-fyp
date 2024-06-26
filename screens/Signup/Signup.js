import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import {Input} from 'react-native-elements';
import Button from '../../components/Button';
import * as yup from 'yup';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import * as Animatable from 'react-native-animatable';
import {Context} from '../../context/AuthContext';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Signup = ({navigation}) => {
  const {signup, state} = useContext(Context);
  let errorMessage = state.errorMessage;
  const [err, setErr] = useState(errorMessage);
  const [errors, setErrors] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // State variable to track registration status

  const handleSubmit = async () => {
    try {
      // Validate the form values
      await validationSchema.validate(
        {name, email, password},
        {abortEarly: false},
      );

      try {
        setIsRegistering(true);
        // Call signup function
        await signup({name, email, password});
        setErr(state.errorMessage);
      } catch (error) {
        // If registration fails, set the registering state back to false
        setIsRegistering(false);
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
      setIsRegistering(false); // Reset registering state if validation fails
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/screen.png')}
          style={styles.logo}
        />
        <Text style={styles.companyName}>Welcome to Tinytot!</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.loginText}>Parent Register</Text>
        <Text style={styles.signInText}>Register to continue</Text>
        <Input
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={e => {
            setErrors('');
            setErr('');
            setName(e);
          }}
          errorMessage={errors.name}
        />
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
          style={[styles.button, isRegistering && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isRegistering}>
          <Text style={styles.buttonText}>
            {isRegistering ? 'Registering...' : 'Register'}
          </Text>
        </TouchableOpacity>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              setErrors('');
              setErr('');
              navigation.navigate('Login');
            }}>
            <Text style={styles.forgotPassword}>Login Here</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F2F2',
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
    backgroundColor: '#FFF',
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

export default Signup;
