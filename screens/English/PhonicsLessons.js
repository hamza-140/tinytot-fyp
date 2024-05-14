// import React, {useEffect, useState} from 'react';
// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import storage from '@react-native-firebase/storage';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const PhonicsLessons = ({navigation}) => {
//   const [animalFiles, setAnimalFiles] = useState([]);

//   useEffect(() => {
//     // Function to fetch file names from Firebase Storage
//     const fetchAnimalFiles = async () => {
//       try {
//         // Get reference to the "Animals" folder
//         const folderRef = storage().ref('lessons/English/Phonics/Animals');

//         // List all items (files and folders) in the "Animals" folder
//         const items = await folderRef.listAll();

//         // Extract file names from the items list
//         const fileNames = items.items.map(item => item.name);

//         // Save file names to state
//         setAnimalFiles(fileNames);
//       } catch (error) {
//         console.error('Error fetching animal files:', error);
//       }
//     };

//     // Fetch animal file names from Firebase Storage
//     fetchAnimalFiles();
//   }, []);
//   const handleItemPress = fileName => {
//     // Navigate to the Phonics screen with the selected file name as a parameter
//     navigation.navigate('Phonics', fileName);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         style={styles.backButton}>
//         <Icon name="backward" size={30} color="black" />
//       </TouchableOpacity>
//       <Text>Animal Files:</Text>
//       {animalFiles.map(fileName => (
//         <TouchableOpacity
//           key={fileName}
//           onPress={() => handleItemPress(fileName)}>
//           <Text>{fileName}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// export default PhonicsLessons;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//   },
// });
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Card from '../../components/Card';
const PhonicsLessons = ({navigation}) => {
  const [animalFiles, setAnimalFiles] = useState([]);

  useEffect(() => {
    // Function to fetch file names from Firebase Storage
    const fetchAnimalFiles = async () => {
      try {
        // Get reference to the "Animals" folder
        const folderRef = storage().ref('lessons/English/Phonics/Animals');

        // List all items (files and folders) in the "Animals" folder
        const items = await folderRef.listAll();

        // Extract file names from the items list
        const fileNames = items.items.map(item => item.name);

        // Save file names to state
        setAnimalFiles(fileNames);
      } catch (error) {
        console.error('Error fetching animal files:', error);
      }
    };

    // Fetch animal file names from Firebase Storage
    fetchAnimalFiles();
  }, []);

  const renderCard = ({item}) => (
    <Card letter={item} onPress={() => handleItemPress(item)} heading1={true} />
  );

  const handleItemPress = fileName => {
    // Navigate to the Phonics screen with the selected file name as a parameter
    navigation.navigate('Phonics', fileName);
  };

  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      style={styles.background}>
      <View style={styles.container}>
        <FlatList
          data={animalFiles}
          horizontal
          renderItem={renderCard}
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

export default PhonicsLessons;

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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});
