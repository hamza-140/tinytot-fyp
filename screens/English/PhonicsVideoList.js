import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native';
import storage from '@react-native-firebase/storage';

const PhonicsVideoList = ({navigation}) => {
  const [videoFiles, setVideoFiles] = useState([]);

  useEffect(() => {
    const fetchVideoFiles = async () => {
      try {
        const folderRef = storage().ref('lessons/English/Phonics/Video');
        const items = await folderRef.listAll();
        const fileNames = items.items.map(item => item.name);
        setVideoFiles(fileNames);
      } catch (error) {
        console.error('Error fetching video files:', error);
      }
    };

    fetchVideoFiles();
  }, []);

  const handleItemPress = fileName => {
    // Navigate to the PhonicsVideo screen with the selected video file name as a parameter
    console.log('fileName', fileName);
    navigation.navigate('PhonicsVideo', {fileName: fileName});
  };

  const renderVideoItem = ({item}) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <Text style={styles.item}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videoFiles}
        renderItem={renderVideoItem}
        keyExtractor={item => item}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    fontSize: 18,
    padding: 10,
    marginVertical: 5,
  },
});

export default PhonicsVideoList;
