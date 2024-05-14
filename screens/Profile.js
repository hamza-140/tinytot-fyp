import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Context} from '../context/AuthContext';
import { navigate } from '../ref/navigationRef';
import { useNavigation } from '@react-navigation/native';

const Profile = ({navigation}) => {
  const [kidInfo, setKidInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const {signout} = useContext(Context);
  // const navigation = useNavigation();

  useEffect(() => {
    const fetchKidInfo = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const parentRef = firestore()
            .collection('parents')
            .doc(currentUser.uid);
          const parentDoc = await parentRef.get();
          if (parentDoc.exists) {
            const parentData = parentDoc.data();
            const kidInfoFromParent = parentData.kidInfo;
            if (kidInfoFromParent) {
              console.log(kidInfoFromParent);
              setKidInfo(kidInfoFromParent);
            } else {
              console.log('Kid info not found in parent document');
            }
          } else {
            console.log('Parent document not found');
          }
        } else {
          console.log('User not logged in');
        }
      } catch (error) {
        console.log('Error fetching kid info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKidInfo();
  }, []);

  // Dummy UserModel data
  const dummyUser = {
    signedInUser: {
      image: 'https://via.placeholder.com/160', // Placeholder image URL
      username: 'JohnDoe',
      firstName: 'John',
      email: 'johndoe@example.com',
      gender: 'Male',
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.userInfo}>
          <Image
            source={{uri: dummyUser.signedInUser.image}}
            style={styles.avatar}
          />
          <View style={styles.textContainer}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>{kidInfo?.name || 'N/A'}</Text>
          </View>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.text}>{kidInfo?.age || 'N/A'}</Text>
          </View>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.text}>{kidInfo?.gender || 'N/A'}</Text>
          </View>
          <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              signout();
            }}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.goBack(); // Navigate back to previous screen
            }}>
            <Text style={styles.buttonText}>Return</Text>
          </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    flexDirection: 'row', // Horizontal layout
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopRightRadius: 100,
  },
  title: {
    color: 'purple',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: 'purple',
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom:5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
export default Profile;
