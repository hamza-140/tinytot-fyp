import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../../components/Card';

const PhonicsHome = ({navigation}) => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    // Function to fetch folder names from Firebase Storage
    const fetchFolders = async () => {
      try {
        // Get reference to the "Phonics" folder
        const folderRef = storage().ref('lessons/English/Phonics');

        // List all items (files and folders) in the "Phonics" folder
        const items = await folderRef.listAll();

        // Extract folder names from the items list
        const folderNames = items.prefixes.map(prefix => prefix.name);

        // Save folder names to state
        setFolders(folderNames);
      } catch (error) {
        console.error('Error fetching folder names:', error);
      }
    };

    // Fetch folder names from Firebase Storage
    fetchFolders();
  }, []);

  const handleFolderPress = folderName => {
    if (folderName == 'Animals') {
      navigation.navigate('PhonicsLessons');
    } else {
      navigation.navigate('PhonicsVideoList');
    }
  };
  // Navigate to the corresponding screen for the selected folder

  const renderFolderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handleFolderPress(item)}
      style={styles.folderItem}>
      <Text style={styles.folderText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={folders}
          renderItem={renderFolderItem}
          keyExtractor={item => item}
          contentContainerStyle={styles.flatListContainer}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="backward" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  folderItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
  },
  folderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});

export default PhonicsHome;
