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
  ImageBackground,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Input} from 'react-native-elements';
import {useRoute} from '@react-navigation/native';

const MultipleChoiceQuiz = ({question, options, onAnswer}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <View>
      <Text style={styles.questionText}>{question}</Text>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={styles.optionButton}
          onPress={() => setSelectedOption(option)}>
          <Text
            style={[
              styles.optionText,
              selectedOption === option && styles.selectedOption,
            ]}>
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
      <Text style={styles.questionText}>{question}</Text>
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
          <Text style={styles.optionText}>{item}</Text>
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
      <Text style={styles.questionText}>{question}</Text>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => setAnswer(true)}>
        <Text
          style={answer === true ? styles.selectedOption : styles.optionText}>
          True
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => setAnswer(false)}>
        <Text
          style={answer === false ? styles.selectedOption : styles.optionText}>
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
  const [userProgress, setUserProgress] = useState({
    englishWorkbookProgress: [],
    mathWorkbookProgress: [],
    islamiyatWorkbookProgress: [],
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
            console.log(quizzesData['English']);
            setQuizzes(quizzesData);
          } else {
            console.log('Parent document does not exist');
          }

          // Fetch user progress
          const userRef = firestore().collection('users').doc(currentUser.uid);
          const userDoc = await userRef.get();
          if (userDoc.exists) {
            setUserProgress(userDoc.data());
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

  const handleQuizAnswer = async (answer, quizId) => {
    console.log('Answered:', answer);
    if (answer === true) {
      // Assume correct answer is 'true'
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const parentRef = firestore()
            .collection('parents')
            .doc(currentUser.uid);
          const userRef = firestore().collection('users').doc(currentUser.uid);

          // Get the parent and user documents
          const parentDoc = await parentRef.get();
          const userDoc = await userRef.get();

          // Update the parent's progress array
          if (parentDoc.exists) {
            const parentData = parentDoc.data();
            const parentProgress =
              parentData[`${currentCategory.toLowerCase()}WorkbookProgress`] ||
              [];
            if (!parentProgress.includes(quizId)) {
              parentProgress.push(quizId);
              await parentRef.update({
                [`${currentCategory.toLowerCase()}WorkbookProgress`]:
                  parentProgress,
              });
            }
          }

          // Update the user's progress array
          if (userDoc.exists) {
            const userData = userDoc.data();
            const userProgress =
              userData[`${currentCategory.toLowerCase()}WorkbookProgress`] ||
              [];
            console.log('user progress', userProgress);
            if (!userProgress.includes(quizId)) {
              userProgress.push(quizId);
              await userRef.update({
                [`${currentCategory.toLowerCase()}WorkbookProgress`]:
                  userProgress,
              });
              setUserProgress(prevState => ({
                ...prevState,
                [`${currentCategory.toLowerCase()}WorkbookProgress`]:
                  userProgress,
              }));
            }
          }
        }
      } catch (error) {
        console.log('Error updating progress:', error);
      }
    }
    // Handle quiz answer logic
    setCurrentQuiz(null);
  };

  const calculateTotalProgress = () => {
    const currentProgressArray =
      userProgress[`${currentCategory.toLowerCase()}WorkbookProgress`] || [];
    return Math.floor(
      (currentProgressArray.length / quizzes[currentCategory].length) * 100,
    );
  };

  const renderQuiz = quiz => {
    switch (quiz.type) {
      case 'multipleChoice':
        return (
          <MultipleChoiceQuiz
            {...quiz}
            onAnswer={answer => handleQuizAnswer(answer, quiz.id)}
          />
        );
      case 'blankSpace':
        return (
          <BlankSpaceQuiz
            {...quiz}
            onAnswer={answer => handleQuizAnswer(answer, quiz.id)}
          />
        );
      case 'matching':
        return (
          <MatchingQuiz
            {...quiz}
            onAnswer={answer => handleQuizAnswer(answer, quiz.id)}
          />
        );
      case 'trueFalse':
        return (
          <TrueFalseQuiz
            {...quiz}
            onAnswer={answer => handleQuizAnswer(answer, quiz.id)}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.heading}>{currentCategory} Workbook</Text>
        {currentCategory === 'English' ? (
          <>
            {currentQuiz ? (
              renderQuiz(currentQuiz)
            ) : (
              <ScrollView contentContainerStyle={styles.lessonListContainer}>
                {quizzes[currentCategory].map((quiz, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.card,
                      userProgress.englishWorkbookProgress.includes(quiz.id) &&
                        styles.completedCard,
                    ]}
                    onPress={() => startQuiz(quiz)}>
                    <View style={styles.cardContent}>
                      <Text
                        style={[
                          styles.cardText,
                          userProgress.englishWorkbookProgress.includes(
                            quiz.id,
                          ) && styles.completedCardText,
                        ]}>
                        {quiz.question}
                      </Text>
                      {}
                    </View>
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
                      styles.card,
                      lessonsCompleted[currentCategory].includes(
                        quiz.question,
                      ) && styles.completedCard,
                    ]}
                    onPress={() => startQuiz(quiz)}>
                    <View style={styles.cardContent}>
                      <Text
                        style={[
                          styles.cardText,
                          lessonsCompleted[currentCategory].includes(
                            quiz.question,
                          ) && styles.completedCardText,
                        ]}>
                        {quiz.question}
                      </Text>
                      {}
                    </View>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#4a90e2',
  },
  lessonListContainer: {
    paddingBottom: 50,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  completedCard: {
    backgroundColor: '#d4edda',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
  completedCardText: {
    textDecorationLine: 'line-through',
    color: '#888',
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
    backgroundColor: '#4a90e2',
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
  optionButton: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    fontWeight: 'bold',
    backgroundColor: '#d0e1ff',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
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
