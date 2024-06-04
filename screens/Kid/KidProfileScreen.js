import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Button from '../../components/Button';
import {Input, Slider} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';

const KidProfileScreen = ({navigation, route}) => {
  const {parentId, kidInfo} = route.params;
  const [name, setName] = useState(kidInfo?.name || '');
  const [age, setAge] = useState(Number(kidInfo?.age) || 3);
  const [gender, setGender] = useState(kidInfo?.gender || '');
  const [avatarNo, setAvatarNo] = useState(kidInfo?.avatarNo || 1);

  const handleSave = async () => {
    try {
      await firestore().collection('parents').doc(parentId).update({
        kidInfo: {name, age, gender, avatarNo},
      });
      console.log('Kid information saved!');
      navigation.navigate('Main');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const CustomAvatar = ({imageSource, onPress, isSelected}) => (
    <TouchableOpacity onPress={onPress}>
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

  useEffect(() => {
    if (kidInfo?.avatarNo) {
      switch (kidInfo.avatarNo) {
        case 1:
          setSelectedAvatar(require('../../assets/images/avatars/bear.png'));
          break;
        case 2:
          setSelectedAvatar(require('../../assets/images/avatars/dog.png'));
          break;
        case 3:
          setSelectedAvatar(require('../../assets/images/avatars/fox.png'));
          break;
        case 4:
          setSelectedAvatar(require('../../assets/images/avatars/penguin.png'));
          break;
        default:
          setSelectedAvatar(require('../../assets/images/avatars/bear.png'));
          break;
      }
    }
  }, [kidInfo]);

  const renderAvatars = () => {
    const avatarImages = [
      require('../../assets/images/avatars/bear.png'),
      require('../../assets/images/avatars/dog.png'),
      require('../../assets/images/avatars/fox.png'),
      require('../../assets/images/avatars/penguin.png'),
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
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/screen.png')} // Replace with your logo URL
            style={styles.logo}
          />
          <Text style={styles.companyName}>Kid Profile</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Text style={styles.signInText}>Choose Avatar:</Text>
          <View style={styles.avatars}>{renderAvatars()}</View>
        </View>

        <Input
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          labelStyle={{color: 'grey', fontSize: 16}}
          label={'Kid Name'}
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={'#fff'}
          value={name}
          onChangeText={setName}
        />
        <Text
          style={[
            styles.sliderLabel,
            {
              fontSize: 16,
              color: 'lightGrey',
              alignSelf: 'flex-start',
              paddingLeft: 10,
            },
          ]}>
          Kid Age: {age}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={3}
          maximumValue={7}
          step={1}
          thumbTintColor="#006666"
          value={age}
          onValueChange={value => setAge(value)}
          minimumTrackTintColor="#006666"
          maximumTrackTintColor="#FFF"
        />
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={itemValue => setGender(itemValue)}>
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
        <Button
          buttonStyle={styles.btn}
          title="Save"
          isDisabled={name === '' || age === '' || gender === ''}
          onPress={handleSave}
        />
        <Button
          buttonStyle={styles.btn}
          title="Return"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </ScrollView>
  );
};

export default KidProfileScreen;

const styles = StyleSheet.create({
  btn: {
    width: '100%',
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#E6F2F2',
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6F2F2',
    padding: 16,
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
  title: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'PFSquareSansPro-Bold-subset',
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
  picker: {
    height: 40,
    width: '100%',
    color: '#004d4d',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 18,
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: 8,
  },
  sliderLabel: {
    color: 'grey',
    fontWeight: 'bold',
    fontFamilymily: 'sans-sarif',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 16,
  },
});
