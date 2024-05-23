import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ParentComponent from './ParentComponent';

const WorkbookScreen = () => {
  const [lessonsCompleted, setLessonsCompleted] = useState({
    English: [],
    Math: [],
    Islamiyat: [],
  });
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('English');

  useEffect(() => {
    const fetchEnglishLessons = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const parentRef = firestore().collection('parents').doc(currentUser.uid);
          const parentDoc = await parentRef.get();

          if (parentDoc.exists) {
            const english = parentDoc.data().english;

            if (english) {
              const completedLessons = Object.keys(english)
                .filter(key => english[key].isCompleted)
                .sort();

              console.log('Completed English Lessons:', completedLessons);

              setLessonsCompleted(prevState => ({
                ...prevState,
                English: completedLessons,
              }));
            } else {
              console.log('No English lessons found');
            }
          } else {
            console.log('Parent document does not exist');
          }
        } else {
          console.log('User not logged in');
        }
      } catch (error) {
        console.log('Error fetching English lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnglishLessons();
  }, []);

  const toggleLessonCompletion = lesson => {
    if (lessonsCompleted[currentCategory].includes(lesson)) {
      setSelectedLesson(lesson);
      setModalVisible(true);
    } else {
      const updatedCompletedLessons = [
        ...lessonsCompleted[currentCategory],
        lesson,
      ];
      setLessonsCompleted(prevState => ({
        ...prevState,
        [currentCategory]: updatedCompletedLessons,
      }));
    }
  };

  const calculateTotalProgress = () => {
    return Math.floor(
      (lessonsCompleted[currentCategory].length /
        categories[currentCategory].length) *
        100,
    );
  };

  const categories = {
    English: Array.from(Array(26), (e, i) => String.fromCharCode(65 + i)),
    Math: Array.from(Array(10), (e, i) => i.toString()),
    Islamiyat: ['Lesson 1', 'Lesson 2', 'Lesson 3'],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Workbook</Text>

      <View style={styles.categorySelector}>
        {Object.keys(categories).map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              currentCategory === category && styles.activeCategory,
            ]}
            onPress={() => setCurrentCategory(category)}>
            <Text style={styles.categoryButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {currentCategory === 'English' ? (
            <ParentComponent />
          ) : (
            <ScrollView contentContainerStyle={styles.lessonListContainer}>
              {categories[currentCategory].map(lesson => (
                <TouchableOpacity
                  key={lesson}
                  style={[
                    styles.lessonItem,
                    lessonsCompleted[currentCategory].includes(lesson) &&
                      styles.completedLesson,
                  ]}
                  onPress={() => toggleLessonCompletion(lesson)}>
                  <Text
                    style={[
                      styles.lessonText,
                      lessonsCompleted[currentCategory].includes(lesson) &&
                        styles.completedLessonText,
                    ]}>
                    {lesson}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          <View style={styles.progressContainer}>
            <Text>Total Progress:</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${calculateTotalProgress()}%` },
                ]}
              />
            </View>
            <Text>{calculateTotalProgress()}%</Text>
          </View>
        </>
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              The lesson "{selectedLesson}" is already completed!
            </Text>
            <Button title="OK" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#75DA',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categorySelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activeCategory: {
    backgroundColor: '#aaa',
  },
  categoryButtonText: {
    fontSize: 16,
  },
  lessonListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: 'pink',
    width: 400,
  },
  lessonItem: {
    width: 60,
    height: 60,
    margin: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  completedLesson: {
    backgroundColor: '#aaffaa',
    borderColor: '#00aa00',
  },
  lessonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  completedLessonText: {
    color: '#00aa00',
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  progressBar: {
    backgroundColor: '#ccc',
    height: 20,
    width: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  progressFill: {
    backgroundColor: '#00aa00',
    height: '100%',
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default WorkbookScreen;
