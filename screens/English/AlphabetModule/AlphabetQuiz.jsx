import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import LottieView from 'lottie-react-native';

import Svg, {Path, Circle, Rect} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {navigate} from '../../../ref/navigationRef';

const circleX = 200;
const circleX2 = 200;
const circleY2 = 40 + 70;
const circleY = 40;
const windowWidth = Dimensions.get('window').width;

const circles = [
  {x: circleX, y: circleY, color: 'blue'},
  {x: circleX, y: circleY + 70, color: 'yellow'},
  {x: circleX, y: circleY + 140, color: 'orange'},
  {x: circleX, y: circleY + 210, color: 'purple'},
];

const squares = [
  {x: 475, y: 175, color: 'blue'},
  {x: 475, y: 175 + 70, color: 'purple'},
  {x: 475, y: 175 - 70, color: 'orange'},
  {x: 475, y: 175 - 140, color: 'yellow'},
];

const AlphabetQuiz = ({letter, progress, setProgress}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showAnimationFail, setShowAnimationFail] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [paths, setPaths] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPath, setCurrentPath] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startColor, setStartColor] = useState(null);

  useEffect(() => {
    console.log(count);
    if (count == 4) {
      setShowCongratulations(true);
      if (progress == 80) {
        setProgress(100);
      }
    }
  }, [count]);

  const circleRadius = 10;
  const squareSize = 10;

  const findColor = (x, y, elements) => {
    for (let element of elements) {
      if (
        Math.pow(x - element.x, 2) + Math.pow(y - element.y, 2) <=
        Math.pow(circleRadius, 2)
      ) {
        return element.color;
      }
    }
    return null;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: evt => {
      const {locationX, locationY} = evt.nativeEvent;
      const color = findColor(locationX, locationY, circles);
      if (color) {
        setIsDrawing(true);
        setStartColor(color);
        setCurrentPath(`M${locationX},${locationY}`);
        return true;
      }
      return false;
    },
    onPanResponderMove: evt => {
      if (isDrawing) {
        const {locationX, locationY} = evt.nativeEvent;
        setCurrentPath(prevPath => `${prevPath} L${locationX},${locationY}`);
      }
    },
    onPanResponderRelease: evt => {
      const {locationX, locationY} = evt.nativeEvent;
      const endColor = findColor(locationX, locationY, squares);
      if (isDrawing && endColor && startColor === endColor) {
        setPaths(prevPaths => [...prevPaths, currentPath]);
        setCurrentPath('');
        setIsDrawing(false);
        setCount(count + 1);
        setShowAnimation(true);
        console.log('Success: Line reached the correct target square!');
      } else {
        setCurrentPath('');
        setShowAnimationFail(true);
        setIsDrawing(false);
      }
    },
  });

  const clearScreen = () => {
    setCount(0);
    setPaths([]);
  };

  return (
    <View style={styles.container}>
      <Svg style={styles.svg} {...panResponder.panHandlers}>
        <View style={styles.gameContainer}>
          <View style={styles.lettersColumn}>
            <Text style={styles.letter}>{letter.toUpperCase()}</Text>
            <Text style={styles.letter}>B</Text>
            <Text style={styles.letter}>C</Text>
            <Text style={styles.letter}>D</Text>
          </View>
          {paths.map((path, index) => (
            <Path
              key={index}
              d={path}
              stroke="black"
              strokeWidth="3"
              fill="none"
            />
          ))}
          {currentPath && (
            <Path d={currentPath} stroke="black" strokeWidth="3" fill="none" />
          )}
          {circles.map((circle, index) => (
            <Circle
              key={index}
              cx={circle.x}
              cy={circle.y}
              r={circleRadius}
              fill={circle.color}
            />
          ))}
          {squares.map((square, index) => (
            <Circle
              key={index}
              cx={square.x}
              cy={square.y}
              r={squareSize}
              fill={square.color}
            />
          ))}

          <View style={styles.spacer} />
          <Modal
            visible={showAnimation}
            transparent
            animationType="fade"
            onRequestClose={() => setShowAnimation(false)}>
            <TouchableWithoutFeedback onPress={() => setShowAnimation(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <LottieView
                    source={require('../../../assets/animations/green.json')}
                    autoPlay
                    loop={false}
                    style={styles.animation}
                    onAnimationFinish={() => {
                      setShowAnimation(false);
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
            visible={showCongratulations}
            transparent
            animationType="fade"
            onRequestClose={() => setShowCongratulations(false)}>
            <TouchableWithoutFeedback
              onPress={() => setShowCongratulations(false)}>
              <View style={styles.modalContainer2}>
                <View style={styles.modalContent2}>
                  <LottieView
                    source={require('../../../assets/animations/congratuations.json')}
                    autoPlay
                    duration={2500}
                    loop={false}
                    style={styles.animation}
                    onAnimationFinish={() => {
                      setShowCongratulations(false);
                      navigate('English');
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
            visible={showAnimationFail}
            transparent
            animationType="fade"
            onRequestClose={() => setShowAnimationFail(false)}>
            <TouchableWithoutFeedback
              onPress={() => setShowAnimationFail(false)}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <LottieView
                    source={require('../../../assets/animations/red.json')}
                    autoPlay
                    loop={false}
                    style={styles.animation}
                    onAnimationFinish={() => {
                      setShowAnimationFail(false);
                    }}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <View style={styles.lettersColumn}>
            <Text style={styles.letterRight}>b</Text>
            <Text style={styles.letterRight}>c</Text>
            <Text style={styles.letterRight}>{letter.toLowerCase()}</Text>
            <Text style={styles.letterRight}>d</Text>
          </View>
        </View>
      </Svg>
      <TouchableOpacity style={styles.clearButton} onPress={clearScreen}>
        <Icon name="clear" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  svg: {
    flex: 1,
  },
  clearButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'red',
    borderRadius: 25,
    padding: 10,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F90',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer2: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent2: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  modalContent: {
    // backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  level: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F90',
    marginBottom: 20,
  },
  gameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  lettersColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  letter: {
    fontSize: 30,
    width: 50,
    marginLeft: 130,
    height: 50,
    textAlign: 'center',
    lineHeight: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    fontFamily: 'PFSquareSansPro-Bold-subset',
    color: '#FFA500',
    marginVertical: 10,
  },
  letterRight: {
    fontSize: 30,
    width: 50,
    height: 50,
    textAlign: 'center',
    lineHeight: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    fontFamily: 'PFSquareSansPro-Bold-subset',
    color: '#FFA500',
    marginVertical: 10,
  },
  spacer: {
    width: windowWidth * 0.2,
  },
});

export default AlphabetQuiz;
