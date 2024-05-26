import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, Modal,TouchableOpacity, ImageBackground} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Context} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Profile = () => {
  const [kidInfo, setKidInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  const {signout} = useContext(Context);
  const navigation = useNavigation();
  const [imageSrc, setImageSrc] = useState(require('../assets/images/avatars/bear.png'));
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
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

  useEffect(() => {
    if (kidInfo?.avatarNo) {
      switch (kidInfo.avatarNo) {
        case 1:
          setImageSrc(require('../assets/images/avatars/bear.png'));
          break;
        case 2:
          setImageSrc(require('../assets/images/avatars/dog.png'));
          break;
        case 3:
          setImageSrc(require('../assets/images/avatars/fox.png'));
          break;
        case 4:
          setImageSrc(require('../assets/images/avatars/penguin.png'));
          break;
        default:
          setImageSrc(require('../assets/images/avatars/bear.png'));
          break;
      }
    }
  }, [kidInfo]);

  return (
    <ImageBackground
      source={require('../assets/images/profile-bg.jpg')}
      style={styles.background}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalContainerExit}>
          <View style={styles.modalViewExit}>
            <Text style={styles.modalTitle}>Do you want to logout?</Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                style={styles.exitButton}
                onPress={() => {
                  signout();

                }}>
                <Text style={styles.closeButtonText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeModal}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Image source={imageSrc} style={styles.avatar} />
        </View>
        <View style={styles.content}>
          <View style={styles.infoCard}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>{kidInfo?.name || 'N/A'}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.text}>{kidInfo?.age || 'N/A'}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.text}>{kidInfo?.gender || 'N/A'}</Text>
          </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('Main');
              }}
            >
              <Icon name="arrow-left" size={24} color="white" />
              <Text style={styles.buttonText}>Return</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('KidProfile', {
                  parentId: auth().currentUser.uid,
                  kidInfo: kidInfo || {},
                });
              }}
            >
              <Icon name="edit" size={24} color="white" />
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                openModal()
              }}
            >
              <Icon name="sign-out" size={24} color="white" />
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  modalViewExit: {
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#37D6DB',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  exitButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PFSquareSansPro-Bold-subset',

  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'PFSquareSansPro-Bold-subset',
    marginBottom: 15,
    textAlign: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopRightRadius: 100,
    padding: 20,
  },
  modalContainerExit: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  title: {
    color: 'purple',
    fontSize: 30,
    fontFamily: 'PFSquareSansPro-Bold-subset',
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'purple',
  },
  content: {
    flex: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 100,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: 'purple',
    fontFamily: 'PFSquareSansPro-Bold-subset',
  },
  text: {
    color: 'black',
    fontSize: 18,
    textTransform:'capitalize',

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'PFSquareSansPro-Bold-subset',

    marginLeft: 10,
  },
});

export default Profile;
