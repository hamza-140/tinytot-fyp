import React, {useEffect, useState} from 'react';
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
import {Input} from 'react-native-elements';
import {useRoute} from '@react-navigation/native';

// Quiz Components
const MultipleChoiceQuiz = ({question, options, onAnswer}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <View>
      <Text>{question}</Text>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          onPress={() => setSelectedOption(option)}>
          <Text
            style={selectedOption === option ? styles.selectedOption : null}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
      <Button title="Submit" onPress={() => onAnswer(selectedOption)} />
    </View>
  );
};

const BlankSpaceQuiz = ({question, onAnswer}) => {
  const [answer, setAnswer] = useState('');
  return (
    <View>
      <Text>{question}</Text>
      <Input value={answer} onChangeText={setAnswer} />
      <Button title="Submit" onPress={() => onAnswer(answer)} />
    </View>
  );
};

const MatchingQuiz = ({pairs, onAnswer}) => {
  const [selectedItems, setSelectedItems] = useState({});

  const handleSelect = (item, type) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [type]: item,
    }));
  };

  const handleSubmit = () => {
    // Validate matches
    const correct = pairs.every(pair => selectedItems[pair[0]] === pair[1]);
    onAnswer(correct);
  };

  const renderOptions = (items, type) => (
    <View style={styles.optionsContainer}>
      {items.map(item => (
        <TouchableOpacity
          key={item}
          style={[
            styles.option,
            selectedItems[type] === item && styles.selectedOption,
          ]}
          onPress={() => handleSelect(item, type)}>
          <Text>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const leftItems = pairs.map(pair => pair[0]);
  const rightItems = pairs.map(pair => pair[1]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Match the following:</Text>
      <View style={styles.matchingContainer}>
        <View style={styles.column}>
          <Text style={styles.columnHeading}>Column A</Text>
          {renderOptions(leftItems, 'left')}
        </View>
        <View style={styles.column}>
          <Text style={styles.columnHeading}>Column B</Text>
          {renderOptions(rightItems, 'right')}
        </View>
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const TrueFalseQuiz = ({question, onAnswer}) => {
  const [answer, setAnswer] = useState(null);
  return (
    <View>
      <Text>{question}</Text>
      <TouchableOpacity onPress={() => setAnswer(true)}>
        <Text style={answer === true ? styles.selectedOption : null}>True</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setAnswer(false)}>
        <Text style={answer === false ? styles.selectedOption : null}>
          False
        </Text>
      </TouchableOpacity>
      <Button title="Submit" onPress={() => onAnswer(answer)} />
    </View>
  );
};

const Working = () => {
  const route = useRoute();
  const {category} = route.params;
  const [lessonsCompleted, setLessonsCompleted] = useState({
    English: [],
    Math: [],
    Islamiyat: [],
  });
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(category);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizzes, setQuizzes] = useState({
    English: [],
    Math: [],
    Islamiyat: [],
  });

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const parentRef = firestore()
            .collection('parents')
            .doc(currentUser.uid);
          const parentDoc = await parentRef.get();

          if (parentDoc.exists) {
            const quizRefs = ['English', 'Math', 'Islamiyat'].map(subject =>
              firestore().collection('quizzes').doc(subject),
            );

            const quizDocs = await Promise.all(quizRefs.map(ref => ref.get()));
            const quizzesData = quizDocs.reduce((acc, doc, index) => {
              acc[doc.id] = doc.data().quizzes;
              return acc;
            }, {});

            setQuizzes(quizzesData);
          } else {
            console.log('Parent document does not exist');
          }
        } else {
          console.log('User not logged in');
        }
      } catch (error) {
        console.log('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
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

  const startQuiz = quiz => {
    setCurrentQuiz(quiz);
  };

  const handleQuizAnswer = answer => {
    console.log('Answered:', answer);
    // Handle quiz answer logic
    setCurrentQuiz(null);
  };

  const calculateTotalProgress = () => {
    return Math.floor(
      (lessonsCompleted[currentCategory].length /
        quizzes[currentCategory].length) *
        100,
    );
  };

  const renderQuiz = quiz => {
    switch (quiz.type) {
      case 'multipleChoice':
        return <MultipleChoiceQuiz {...quiz} onAnswer={handleQuizAnswer} />;
      case 'blankSpace':
        return <BlankSpaceQuiz {...quiz} onAnswer={handleQuizAnswer} />;
      case 'matching':
        return <MatchingQuiz {...quiz} onAnswer={handleQuizAnswer} />;
      case 'trueFalse':
        return <TrueFalseQuiz {...quiz} onAnswer={handleQuizAnswer} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{category}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {currentQuiz ? (
            renderQuiz(currentQuiz)
          ) : (
            <ScrollView contentContainerStyle={styles.lessonListContainer}>
              {quizzes[currentCategory].map((quiz, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.lessonItem,
                    lessonsCompleted[currentCategory].includes(quiz.question) &&
                      styles.completedLesson,
                  ]}
                  onPress={() => startQuiz(quiz)}>
                  <Text
                    style={[
                      styles.lessonText,
                      lessonsCompleted[currentCategory].includes(
                        quiz.question,
                      ) && styles.completedLessonText,
                    ]}>
                    {quiz.question}
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
                  {width: `${calculateTotalProgress()}%`},
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
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  categorySelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  activeCategory: {
    backgroundColor: '#007bff',
  },
  categoryButtonText: {
    color: '#fff',
  },
  lessonListContainer: {
    paddingBottom: 50,
  },
  lessonItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  completedLesson: {
    backgroundColor: '#d4edda',
  },
  lessonText: {
    fontSize: 16,
  },
  completedLessonText: {
    textDecorationLine: 'line-through',
  },
  progressContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  progressBar: {
    width: '80%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  selectedOption: {
    fontWeight: 'bold',
    backgroundColor: '#d0e1ff',
  },
  matchingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  columnHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
  optionsContainer: {
    width: '80%',
  },
  option: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default Working;
