import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const AlphabetQuiz = ({ route }) => {
  const { letter } = route.params;

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const quizRef = firestore().collection('quizzes').doc('a');
        const doc = await quizRef.get();
        console.log(doc.data().questions)
        if (doc.exists) {
          setQuestions(doc.data().questions);
        } else {
          Alert.alert('No quiz found for this letter');
        }
      } catch (error) {
        console.error('Error fetching quiz data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [letter]);

  const handleOptionPress = (option) => {
    console.log(option)
    console.log(questions[currentQuestion].answer)
    if (option == questions[currentQuestion].answer) {
      // setScore(score + 1);
      Alert.alert('Correct!', 'Good job!');
    } else {
      Alert.alert('Incorrect', 'Try again.');
    }

    // if (currentQuestion < questions.length - 1) {
    //   setCurrentQuestion(currentQuestion + 1);
    // } else {
    //   Alert.alert('Quiz Complete', `Your score is ${score + 1}/${questions.length}`);
    //   setCurrentQuestion(0);
    //   setScore(0);
    // }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No questions available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{questions[currentQuestion].question}</Text>
      <View style={styles.optionsContainer}>
        {questions[currentQuestion].options.map((option, index) => (
          <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleOptionPress(option)}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  optionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 18,
  },
});

export default AlphabetQuiz;
