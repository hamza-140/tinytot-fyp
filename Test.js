/* 
                                                ============================
                                                | IMPORTS AND DEPENDENCIES |  
                                                ============================
*/

import firestore from '@react-native-firebase/firestore';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Button from './components/Button';
import {Input} from 'react-native-elements';

/* 
                                                ===================
                                                | ADD KID PROFILE |  
                                                ===================
*/

const Test = ({navigation, route}) => {
//   const {parentId} = route.params;
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  
  const handleSave = async () => {
    // Uncomment and adjust this when you have the parentId available
    // try {
    //   await firestore().collection('parents').doc(parentId).update({
    //     kidInfo: {name, age, avatarNo},
    //   });
    //   console.log('Kid information saved!');
    //   navigation.navigate('Main');
    // } catch (error) {
    //   console.error('Error updating document: ', error);
    // }
  };

  const CustomAvatar = ({imageSource, onPress, isSelected}) => (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}>
      <Image
        source={imageSource}
        style={[
          styles.avatarImage,
          isSelected && {borderColor: 'green', borderWidth: 4},
        ]}
      />
    </TouchableOpacity>
  );

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatarNo, setAvatarNo] = useState(0);

  const renderAvatars = () => {
    const avatarImages = [
      require('./assets/images/avatars/bear.png'),
      require('./assets/images/avatars/dog.png'),
      require('./assets/images/avatars/fox.png'),
      require('./assets/images/avatars/penguin.png'),
    ];

    return avatarImages.map((imageSource, index) => (
      <CustomAvatar
        key={index}
        imageSource={imageSource}
        onPress={() => {
          setSelectedAvatar(imageSource);
          setAvatarNo(index + 1); // Assuming you want to start avatarNo from 1
        }}
        isSelected={selectedAvatar === imageSource}
      />
    ));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Kid Profile</Text>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarLabel}>Choose an Avatar:</Text>
          <View style={styles.avatars}>{renderAvatars()}</View>
        </View>
        <Input
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={'#fff'}
          value={name}
          onChangeText={setName}
        />
        <Input
          style={styles.input}
          placeholder="Age"
          placeholderTextColor={'#fff'}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <Button buttonStyle={styles.btn} title="Save" isDisabled={name==""||age==""} onPress={handleSave} />
        
      </View>
    </ScrollView>
  );
};

export default Test;

/* 
                                                ==========
                                                | STYLES |  
                                                ==========
*/

const styles = StyleSheet.create({
    btn:{
        width:'100%'
    },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#EB6D6D',
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EB6D6D',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'PFSquareSansPro-Bold-subset',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 8,
  },
  avatarContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  avatarLabel: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  avatars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatarImage: {
    width: 90,
    
    height: 90,
    borderRadius: 45,
  },
});
