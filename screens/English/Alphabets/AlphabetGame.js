/* eslint-disable prettier/prettier */
import React, {useRef, useState} from 'react';
import {Text, View, PanResponder, Animated, Button, Image} from 'react-native';

const AlphabetGame = () => {
  const pan1 = useRef(new Animated.ValueXY()).current;
  const pan2 = useRef(new Animated.ValueXY()).current;
  const [gameState, setGameState] = useState('playing'); // 'playing', 'matched', 'reset'

  const checkForMatch = () => {
    const dx = Math.abs(pan1.x._value - pan2.x._value);
    const dy = Math.abs(pan1.y._value - pan2.y._value);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 300) {
      // Adjust this threshold as needed
      setGameState('matched');
    }
  };

  const resetCards = () => {
    Animated.spring(pan1, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
    }).start();

    Animated.spring(pan2, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
    }).start();

    setGameState('playing');
  };

  const renderCards = () => {
    if (gameState === 'playing') {
      return (
        <>
          <Animated.View
            {...panResponder1.panHandlers}
            style={[
              pan1.getLayout(),
              {
                width: 200,
                height: 300,
                backgroundColor: 'skyblue',
                borderRadius: 10,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginRight: 300,
                paddingRight: 10, // Add some padding to give space for the text
              },
            ]}>
            <View>
              <Text style={{fontSize: 100, marginBottom: -30}}>A</Text>
              <Image
                source={require('../../../assets/game/image_part_001.png')}
                style={{
                  width: 100,
                  height: 200,
                  marginLeft: 100,
                }}
              />
            </View>
          </Animated.View>

          <Animated.View
            {...panResponder2.panHandlers}
            style={[
              pan2.getLayout(),
              {
                width: 200,
                height: 300,
                backgroundColor: 'lightgreen',
                borderRadius: 10,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                paddingRight: 10, // Add some padding to give space for the text
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/game/image_part_002.png')}
                style={{width: 100, height: 200}}
              />
              <Text style={{fontSize: 100, marginLeft: 35}}>a</Text>
            </View>
          </Animated.View>
        </>
      );
    } else {
      return (
        <View>
          <Animated.View
            {...panResponder2.panHandlers}
            style={[
              pan2.getLayout(),
              {
                width: 250,
                height: 300,
                backgroundColor: 'lightgreen',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/game/apple.png')}
                style={{width: 100, height: 130, marginTop: 10}}
              />
              <Text style={{fontSize: 100, marginBottom: 10}}>Aa</Text>
            </View>
          </Animated.View>
          <Button
            title="Play Again"
            onPress={resetCards}
            style={{marginTop: 20}}
          />
        </View>
      );
    }
  };

  const panResponder1 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      Animated.event([null, {dx: pan1.x, dy: pan1.y}], {
        useNativeDriver: false,
      })(event, gestureState);
      checkForMatch();
    },
    onPanResponderRelease: () => {
      Animated.spring(pan1, {
        toValue: {x: 0, y: 0},
        useNativeDriver: false,
      }).start();
    },
  });

  const panResponder2 = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      Animated.event([null, {dx: pan2.x, dy: pan2.y}], {
        useNativeDriver: false,
      })(event, gestureState);
      checkForMatch();
    },
    onPanResponderRelease: () => {
      Animated.spring(pan2, {
        toValue: {x: 0, y: 0},
        useNativeDriver: false,
      }).start();
    },
  });

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {renderCards()}
    </View>
  );
};

export default AlphabetGame;
