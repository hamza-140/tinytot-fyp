import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
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

import {Canvas, Mask, Morphology, Path, Skia} from '@shopify/react-native-skia';
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
interface LetterTracingProps {
  letter: string;
  progress: number;
  setProgress: (progress: number) => void;
}
const NumberTracing: React.FC<LetterTracingProps> = ({
  letter,
  progress,
  setProgress,
}) => {
  const [scale, setScale] = useState(0.6); // Start with a smaller scale to ensure visibility
  const [letterPathString, setLetterPathString] = useState('');
  const [isCompleted, setIsCompleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [svgError, setSvgError] = useState(false);

  useEffect(() => {
    const fetchSVG = async () => {
      try {
        if (letter === 'a') {
          setScale(0.5);
        }
        const doc = await firestore()
          .collection('numberVideos')
          .doc(letter)
          .get();
        if (doc.exists) {
          const svg = doc.data()?.svg || '';
          if (svg) {
            setLetterPathString(svg);
          } else {
            console.error('No valid SVG found in the doc');
            setSvgError(true);
          }
        } else {
          console.error('No valid SVG found in the doc for this letter');
          setSvgError(true);
        }
      } catch (error) {
        console.error('Error fetching SVG:', error);
        setSvgError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSVG();
  }, [letter]);

  const scalePath = (pathString: string, scale: number) => {
    const scaledPath = pathString.replace(/([0-9.]+)/g, match =>
      (parseFloat(match) * scale).toString(),
    );
    console.log('Scaled Path:', scaledPath);
    return scaledPath;
  };

  let scaledLetterPathString = '';
  let letterPath = null;

  if (letterPathString && !svgError) {
    try {
      scaledLetterPathString = scalePath(letterPathString, scale);
      letterPath = Skia.Path.MakeFromSVGString(scaledLetterPathString);
      if (!letterPath) throw new Error('Invalid SVG Path');
    } catch (error) {
      console.error('Error parsing SVG Path:', error);
      letterPath = null;
      setSvgError(true);
    }
  }

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
    console.log(width);
  }, [width]);

  const resetDrawing = () => {
    drawPath.value = Skia.Path.Make();
    setIsCompleted(0);
  };

  const checkDrawing = () => {
    if (isCompleted > 185) {
      Alert.alert('YEAH!');
      Tts.speak('Well done!');
      if (progress === 40) {
        setProgress(60);
      } else {
        setProgress(progress);
      }
    } else {
      Alert.alert('NAH!');
      Tts.speak('Try Again!');
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (svgError) {
    return (
      <View style={styles.centered}>
        <Text>Invalid SVG Path. Please try another letter.</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <GestureDetector gesture={gesture}>
        <ScrollView
          style={{
            flex: 1,
            marginLeft: 50,
            marginTop: 50,
            flexDirection: 'row',
          }}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Canvas style={{flex: 1, width: 500, height: 500}}>
            {letterPath && (
              <>
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
                      strokeWidth={20}
                      style="stroke"
                    />
                  }>
                  <Path path={letterPath} color="#FA00FF" strokeWidth={10} />
                </Mask>
              </>
            )}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NumberTracing;
