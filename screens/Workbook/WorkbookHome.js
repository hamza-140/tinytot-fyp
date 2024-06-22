import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ParentComponent from './ParentComponent';
import MathComponent from './MathComponent';
import {PieChart} from 'react-native-gifted-charts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IslamComponent from './IslamComponent';

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
          const parentRef = firestore()
            .collection('parents')
            .doc(currentUser.uid);
          const parentDoc = await parentRef.get();

          if (parentDoc.exists) {
            const english = parentDoc.data().english;
            if (english) {
              const completedLessons = Object.keys(english)
                .filter(key => english[key].isCompleted)
                .sort();
              setLessonsCompleted(prevState => ({
                ...prevState,
                English: completedLessons,
              }));
            }
            const islamiyat = parentDoc.data().islamiyat;
            if (islamiyat) {
              const completedLessons = Object.keys(islamiyat)
                .filter(key => islamiyat[key].isCompleted)
                .sort();
              console.log('islam:', completedLessons.length);
              setLessonsCompleted(prevState => ({
                ...prevState,
                Islamiyat: completedLessons,
              }));
            }
            const math = parentDoc.data().math;
            if (math) {
              const completedLessons = Object.keys(math)
                .filter(key => math[key].isCompleted)
                .sort();
              setLessonsCompleted(prevState => ({
                ...prevState,
                Math: completedLessons,
              }));
            }
          }
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
    console.log(currentCategory);
    return Math.floor(
      (lessonsCompleted[currentCategory].length /
        categories[currentCategory].length) *
        100,
    );
  };
  const [totalLessons, setTotalLessons] = useState([]);

  useEffect(() => {
    const fetchTotalLessons = async () => {
      try {
        const querySnapshot = await firestore().collection('islamVideos').get();
        const lessons = [];
        querySnapshot.forEach(doc => {
          lessons.push(doc.id); // Collect the document IDs
        });
        setTotalLessons(lessons); // Update the state with the fetched IDs
      } catch (error) {
        console.error('Error fetching total lessons:', error);
      }
    };

    fetchTotalLessons();
  }, []);

  const categories = {
    English: Array.from(Array(26), (e, i) => String.fromCharCode(65 + i)),
    Math: Array.from(Array(10), (e, i) => i.toString()),
    Islamiyat: totalLessons,
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
            <Icon
              name={
                category === 'English'
                  ? 'book'
                  : category === 'Math'
                  ? 'functions'
                  : 'school'
              }
              size={24}
              color="#006666"
            />
            <Text style={styles.categoryButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {currentCategory === 'English' ? (
            <ParentComponent widthBar={calculateTotalProgress()} />
          ) : currentCategory === 'Math' ? (
            <MathComponent widthBar={calculateTotalProgress()} />
          ) : (
            <IslamComponent
              widthBar={calculateTotalProgress()}></IslamComponent>
          )}
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
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F2F2',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006666',
    marginBottom: 20,
    textAlign: 'center',
  },
  categorySelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryButton: {
    padding: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  activeCategory: {
    borderBottomWidth: 2,
    borderBottomColor: '#343a40',
  },
  categoryButtonText: {
    fontSize: 16,
    color: '#343a40',
    marginTop: 5,
  },
  lessonListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  lessonItem: {
    width: 60,
    height: 60,
    margin: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    borderWidth: 2,
    borderColor: '#dee2e6',
  },
  completedLesson: {
    backgroundColor: '#aaffaa',
    borderColor: '#00aa00',
  },
  lessonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
  },
  completedLessonText: {
    color: '#00aa00',
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
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default WorkbookScreen;
