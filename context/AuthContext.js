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
      console.log('User account created & signed in!');

      const user = userCredential.user;
      const db = firebase.firestore();
      const progress = {
        english: {
          a: {status: true, isCompleted: false},
          b: {status: false, isCompleted: false},
          c: {status: false, isCompleted: false},
          d: {status: false, isCompleted: false},
          e: {status: false, isCompleted: false},
          f: {status: false, isCompleted: false},
          g: {status: false, isCompleted: false},
          h: {status: false, isCompleted: false},
          i: {status: false, isCompleted: false},
          j: {status: false, isCompleted: false},
          k: {status: false, isCompleted: false},
          l: {status: false, isCompleted: false},
          m: {status: false, isCompleted: false},
          n: {status: false, isCompleted: false},
          o: {status: false, isCompleted: false},
          p: {status: false, isCompleted: false},
          q: {status: false, isCompleted: false},
          r: {status: false, isCompleted: false},
          s: {status: false, isCompleted: false},
          t: {status: false, isCompleted: false},
          u: {status: false, isCompleted: false},
          v: {status: false, isCompleted: false},
          w: {status: false, isCompleted: false},
          x: {status: false, isCompleted: false},
          y: {status: false, isCompleted: false},
          z: {status: false, isCompleted: false},
        },
        math: {
          0: {status: true, isCompleted: false},
          1: {status: false, isCompleted: false},
          2: {status: false, isCompleted: false},
          3: {status: false, isCompleted: false},
          4: {status: false, isCompleted: false},
          5: {status: false, isCompleted: false},
          6: {status: false, isCompleted: false},
          7: {status: false, isCompleted: false},
          8: {status: false, isCompleted: false},
          9: {status: false, isCompleted: false},
        },
        islamiyat: {
          1: {status: true, isCompleted: false},
          2: {status: false, isCompleted: false},
          3: {status: false, isCompleted: false},
          4: {status: false, isCompleted: false},
          5: {status: false, isCompleted: false},
          6: {status: false, isCompleted: false},
          7: {status: false, isCompleted: false},
          8: {status: false, isCompleted: false},
          9: {status: false, isCompleted: false},
          10: {status: false, isCompleted: false},
          11: {status: false, isCompleted: false},
          12: {status: false, isCompleted: false},
          13: {status: false, isCompleted: false},
          14: {status: false, isCompleted: false},
          15: {status: false, isCompleted: false},
          16: {status: false, isCompleted: false},
          17: {status: false, isCompleted: false},
          18: {status: false, isCompleted: false},
          19: {status: false, isCompleted: false},
          20: {status: false, isCompleted: false},
          21: {status: false, isCompleted: false},
          22: {status: false, isCompleted: false},
          23: {status: false, isCompleted: false},
          24: {status: false, isCompleted: false},
          25: {status: false, isCompleted: false},
          26: {status: false, isCompleted: false},
          27: {status: false, isCompleted: false},
          28: {status: false, isCompleted: false},
          29: {status: false, isCompleted: false},
          30: {status: false, isCompleted: false},
          31: {status: false, isCompleted: false},
          32: {status: false, isCompleted: false},
          33: {status: false, isCompleted: false},
          34: {status: false, isCompleted: false},
          35: {status: false, isCompleted: false},
          36: {status: false, isCompleted: false},
          37: {status: false, isCompleted: false},
        },
      };
      await db
        .collection('parents')
        .doc(user.uid)
        .set({name, email, password, kidInfo: {}, ...progress});

      const token = user.uid;
      await Keychain.setGenericPassword('token', token);
      console.log('here');
      dispatch({type: SIGNUP, payload: token});
      navigate('KidProfile', {parentId: user.uid, isEdit: false});
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
      console.error(err.code);
      let errorMessage = 'Unable to sign in. Please try again.'; // Default error message

      // Handle different error types
      if (err.code === 'auth/invalid-credential') {
        errorMessage = 'The email or password is wrong.';
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = 'User not found. Please check your credentials.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      dispatch({
        type: ADD_ERROR,
        payload: errorMessage,
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
    let errorMessage = 'Unable to sign in. Please try again.'; // Default error message

    // Handle different error types
    if (err.code === 'auth/invalid-email') {
      errorMessage = 'The email address is badly formatted.';
    } else if (err.code === 'auth/user-not-found') {
      errorMessage = 'User not found. Please check your credentials.';
    } else if (err.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password. Please try again.';
    } else if (err.code === 'auth/network-request-failed') {
      errorMessage = 'Network error. Please check your internet connection.';
    }
    dispatch({
      type: ADD_ERROR,
      payload: errorMessage,
    });
  }
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signup, signin, clearErrorMessage, tryLocalSignIn, signout},
  {token: null, errorMessage: ''},
);
