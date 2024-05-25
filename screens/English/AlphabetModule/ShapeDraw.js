import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import Tts from 'react-native-tts';


import { useNavigation } from '@react-navigation/native';

import {
  Canvas,
  Fill,
  Mask,
  Morphology,
  Path,
  Skia,
} from '@shopify/react-native-skia';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';


const {width, height} = Dimensions.get('window');

const ShapeDraw= ({ svg}) => {
    const navigate = useNavigation()
    const canvasWidth = 840; // Width of the canvas
const canvasHeight = 420; // Height of the canvas

// Calculate the coordinates for the rectangle
const rectWidth = 400; // Width of the rectangle
const rectHeight = 200; // Height of the rectangle

// Calculate the position of the rectangle to center it horizontally
const rectX = (canvasWidth - rectWidth) / 2; // X-coordinate for the top-left corner of the rectangle
const rectY = (canvasHeight - rectHeight) / 2; // Y-coordinate for the top-left corner of the rectangle

// Define the path string for the rectangle
const letterPathString = svg;
const scalePath = (pathString, scale) => {
  return pathString.replace(/([0-9.]+)/g, (match) => (parseFloat(match) * scale).toString());
};

const scaledLetterPathString = scalePath(letterPathString, 0.8); // Scale down to 80%

  const [drawColor, setDrawColor] = useState("#FA00FF"); // Initial color for drawing
  
  // Other code remains unchanged
  
  const changeColor = (color) => {
    setDrawColor(color);
  };
  const [isCompleted, setIsCompleted] = useState(0);
  // const letterPath = Skia.Path.MakeFromSVGString(
  //   'm270 310 64.5 -302.52 35.9 0 64.5 302.52 -31.3 0 -19.15 -98.76 -64 0 -19.15 98.76 -31.3 0zm108.65 -128.94 -26.2 -142.98 -26.35 142.98 52.55 0z',
  // )!;
  // const originalPath = 'm270 310 64.5 -302.52 35.9 0 64.5 302.52 -31.3 0 -19.15 -98.76 -64 0 -19.15 98.76 -31.3 0zm108.65 -128.94 -26.2 -142.98 -26.35 142.98 52.55 0z';
  const letterPath = Skia.Path.MakeFromSVGString(scaledLetterPathString);
  
  // const letterPath = Skia.Path.MakeFromSVGString(scaledPath)!;
  const drawPath = useSharedValue(Skia.Path.Make());

  const gesture = Gesture.Pan()
    .onBegin(event => {
      drawPath.value.moveTo(event.x, event.y);
      drawPath.modify();
      runOnJS(setIsCompleted)(drawPath.value.countPoints());

    })
    .onChange(event => {
      drawPath.value.lineTo(event.x, event.y);
      drawPath.modify();
      runOnJS(setIsCompleted)(drawPath.value.countPoints());

    })
    .onEnd(event => {
      runOnJS(setIsCompleted)(drawPath.value.countPoints());
    });

  useEffect(() => {
    Tts.speak("Draw the Shape!")

  }, []);

  const resetDrawing = () => {
    drawPath.value = Skia.Path.Make();
    setIsCompleted(0);
  };
  const returnHome = () => {
    navigate.navigate('Shape');
};
  const checkDrawing = () => {
    if (isCompleted > 185) {
      Alert.alert('YEAH!');
      Tts.speak("Well done!");
     
      

    }
    else{
      Alert.alert("NAH!")
      Tts.speak("Try Again!");
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GestureDetector gesture={gesture}>
        <ScrollView style={{flex: 1, flexDirection: 'row'}}>
          <Canvas style={{flex: 1, width, height}}>
            {/* <Fill /> */}
            {/* Letter black border */}
            <Path path={letterPath} color="black" strokeWidth={10}>
              <Morphology radius={6} />
            </Path>

            {/* Letter white background */}
            <Path path={letterPath} color="white" strokeWidth={10}>
              <Morphology radius={3} />
            </Path>

            {/* Masked letter background by the user drawn path */}
            <Mask
              mask={
                <Path
                  path={drawPath}
                  color="black"
                  strokeWidth={10}
                  style="stroke"
                />
              }>
              <Path path={letterPath} color={drawColor} strokeWidth={10} />
            </Mask>
          </Canvas>
        </ScrollView>
      </GestureDetector>
      
      <TouchableOpacity style={styles.resetButton} onPress={resetDrawing}>
        <Icon name="refresh" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.checkButton} onPress={returnHome}>
        <Icon name="home" size={30} color="#fff" />
      </TouchableOpacity>
      
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  resetButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#fe0000',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  checkButton: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    backgroundColor: 'teal',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
});

export default ShapeDraw;
