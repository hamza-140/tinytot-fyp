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

interface LetterTracingProps {
  progress: number;
  setProgress: (progress: number) => void;
}
const {width, height} = Dimensions.get('window');
const letterPathString = 'm380 340 64.5 -302.52 35.9 0 64.5 302.52 -31.3 0 -19.15 -98.76 -64 0 -19.15 98.76 -31.3 0zm108.65 -128.94 -26.2 -142.98 -26.35 142.98 52.55 0z';

const scalePath = (pathString: string, scale: number): string => {
  return pathString.replace(/([0-9.]+)/g, (match) => (parseFloat(match) * scale).toString());
};

const scaledLetterPathString = scalePath(letterPathString, 0.8); // Scale down to 80%

const LetterTracing: React.FC<LetterTracingProps> = ({ progress, setProgress }) => {
  
  const [isCompleted, setIsCompleted] = useState(0);
  // const letterPath = Skia.Path.MakeFromSVGString(
  //   'm270 310 64.5 -302.52 35.9 0 64.5 302.52 -31.3 0 -19.15 -98.76 -64 0 -19.15 98.76 -31.3 0zm108.65 -128.94 -26.2 -142.98 -26.35 142.98 52.55 0z',
  // )!;
  // const originalPath = 'm270 310 64.5 -302.52 35.9 0 64.5 302.52 -31.3 0 -19.15 -98.76 -64 0 -19.15 98.76 -31.3 0zm108.65 -128.94 -26.2 -142.98 -26.35 142.98 52.55 0z';
  const letterPath = Skia.Path.MakeFromSVGString(scaledLetterPathString)!;
  
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

  // useEffect(() => {
  //   console.log(width)

  // }, [isCompleted]);

  const resetDrawing = () => {
    drawPath.value = Skia.Path.Make();
    setIsCompleted(0);
  };
  const checkDrawing = () => {
    if (isCompleted > 185) {
      Alert.alert('YEAH!');
      Tts.speak("Well done!");
      if(progress===40){
        setProgress(60)
      }
      else{
        setProgress(progress)
      }

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
            <Fill color="#75DA" />
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
                  strokeWidth={100}
                  style="stroke"
                />
              }>
              <Path path={letterPath} color="#FA00FF" strokeWidth={10} />
            </Mask>
          </Canvas>
        </ScrollView>
      </GestureDetector>
      <TouchableOpacity style={styles.resetButton} onPress={resetDrawing}>
        <Icon name="refresh" size={30} color="#fe0000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.checkButton} onPress={checkDrawing}>
        <Icon name="check-circle-outline" size={30} color="#03fe1c" />
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  resetButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
  checkButton: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },
});

export default LetterTracing;
