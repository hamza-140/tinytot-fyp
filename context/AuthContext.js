/* 
                                                ============================
                                                | IMPORTS AND DEPENDENCIES |  
                                                ============================
*/

import createDataContext from './createDataContext';
import auth from '@react-native-firebase/auth';
import {navigate} from '../ref/navigationRef';
import * as Keychain from 'react-native-keychain';
import {firebase} from '@react-native-firebase/firestore';

/* 
                                                ================
                                                | ACTION TYPES |  
                                                ================
*/

const ADD_ERROR = 'add_error';
const SIGNUP = 'signup';
const CLEAR = 'clear_errorMessage';
const SIGNOUT = 'signout';

/* 
                                                ==================================================================
                                                | REDUCER FUNCTION TO UPDATE STATE ON AN ACTION AND DEPENDENCIES |  
                                                ==================================================================
*/

const authReducer = (state, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return {...state, errorMessage: action.payload};
    case SIGNUP:
      return {errorMessage: '', token: action.payload};
    case SIGNOUT:
      return {token: null, errorMessage: ''};
    case CLEAR:
      return {...state, errorMessage: ''};
    default:
      return state;
  }
};
/* 
                                                ===================
                                                | ACTION FUCTIONS |  
                                                ===================
*/

const clearErrorMessage = dispatch => () => {
  dispatch({type: CLEAR});
};

// const signup =
//   dispatch =>
//   async ({email, password}) => {
//     try {
//       const response = await auth().createUserWithEmailAndPassword(
//         email,
//         password,
//       );
//       const token = response.user.uid;
//       // await .setItem('token', token);
//       // await SecureKeyStore.set('token', token);
//       await Keychain.setGenericPassword('token', token);
//       dispatch({type: SIGNUP, payload: token});
//       navigate('KidProfile');
//     }
// catch (err) {
//       console.error(err);
//       dispatch({
//         type: ADD_ERROR,
//         payload: 'Something went wrong!',
//       });
//     }
//   };

const signup =
  dispatch =>
  async ({name, email, password}) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const db = firebase.firestore();

      await db
        .collection('parents')
        .doc(user.uid)
        .set({name, email, password, kidInfo: {}});

      const token = user.uid;
      await Keychain.setGenericPassword('token', token);
      dispatch({type: SIGNUP, payload: token});
      navigate('KidProfile', {parentId: user.uid});
    } catch (error) {
      console.error('Error during signup:', error);
      dispatch({
        type: ADD_ERROR,
        payload: 'Something went wrong during signup!',
      });
    }
  };

/* 
                                                ===============
                                                | CHECK TOKEN |  
                                                ===============
*/

const tryLocalSignIn = dispatch => async () => {
  try {
    const token = await Keychain.getGenericPassword();
    if (token) {
      dispatch({type: SIGNUP, payload: token});
      navigate('Main');
    } else {
      navigate('Login');
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
};

const signin =
  dispatch =>
  async ({email, password}) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      const token = response.user.uid;
      await Keychain.setGenericPassword('token', token);
      console.log('in signin', Keychain.getGenericPassword());
      dispatch({type: SIGNUP, payload: token});
      navigate('Main');
    } catch (err) {
      console.error(err);
      dispatch({
        type: ADD_ERROR,
        payload: 'Unable to sign in. ',
      });
    }
  };

const signout = dispatch => async () => {
  try {
    await auth().signOut();
    // await AsyncStorage.removeItem('token');
    await Keychain.resetGenericPassword();
    dispatch({type: SIGNOUT});
    console.log('in signout', Keychain.getGenericPassword());
    navigate('Login');
  } catch (err) {
    console.error(err);
    dispatch({
      type: ADD_ERROR,
      payload: 'Unable to sign out. Please try again.',
    });
  }
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signup, signin, clearErrorMessage, tryLocalSignIn, signout},
  {token: null, errorMessage: ''},
);
