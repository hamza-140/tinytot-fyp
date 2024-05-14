import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const EnglishQuiz = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);

  const navigation = useNavigation();

  const question = 'Which letter is this?';

  const options = [
    { label: 'A) C', isCorrect: false },
    { label: 'B) D', isCorrect: true },
    { label: 'C) P', isCorrect: false },
    { label: 'D) R', isCorrect: false },
  ];

  const checkAnswer = (selectedOption) => {
    if (options[selectedOption].isCorrect) {
      setFeedback('Correct! Well done.');
      setShowAnimation(true);
    } else {
      setFeedback('Oops! Try again.');
    }

    setSelectedAnswer(selectedOption);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setFeedback('');
    setShowAnimation(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === index &&
                (options[index].isCorrect
                  ? styles.correctOption
                  : styles.incorrectOption),
            ]}
            onPress={() => {
              checkAnswer(index);
              if (!options[index].isCorrect) {
                setTimeout(resetQuiz, 1000);
              }
            }}
            disabled={selectedAnswer !== null}>
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {feedback !== '' && <Text style={styles.feedbackText}>{feedback}</Text>}

      <Modal
        visible={showAnimation}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAnimation(false)}>
        <TouchableWithoutFeedback onPress={() => setShowAnimation(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <LottieView
                source={require('../../assets/animations/congratuations.json')}
                autoPlay
                loop={false}
                style={styles.animation}
                onAnimationFinish={() => {
                  setShowAnimation(false);
                  resetQuiz();
                  navigation.goBack();
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '80%',
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: '48%', // Adjust this value to leave some space between options
    alignItems: 'center',
  },
  correctOption: {
    backgroundColor: 'green',
  },
  incorrectOption: {
    backgroundColor: 'red',
  },
  optionText: {
    fontSize: 18,
  },
  feedbackText: {
    fontSize: 20,
    marginTop: 20,
    color: 'green',
  },
  animation: {
    width: 200,
    height: 200,
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EnglishQuiz;
