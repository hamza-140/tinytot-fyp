/* 
                                                ============================
                                                | IMPORTS AND DEPENDENCIES |  
                                                ============================
*/

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainMenu from './screens/Home/MainMenu';
import Alphabets from './screens/English/Alphabets';
import {Provider as AuthProvider} from './context/AuthContext';
import EnglishHome from './screens/English/EnglishHome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import YouTubePlayer from './components/YoutubePlayer';
import LetterTracing from './screens/English/AlphabetModule/LetterTracing';
import Signup from './screens/Signup/Signup';
import KidProfileScreen from './screens/Kid/KidProfileScreen';
import Tracing from './screens/English/Tracing';
import {setNavigator} from './ref/navigationRef';
import Login from './screens/Login/Login';
import Checker from './screens/Checker';
import Phonics from './screens/English/Phonics';
import Vocabulary from './screens/English/Vocabulary';
import MathHome from './screens/Math/MathHome';
import WorkbookHome from './screens/Workbook/WorkbookHome';
import PhonicsLessons from './screens/English/PhonicsLessons';
import EnglishLessons from './screens/English/EnglishLessons';
import Profile from './screens/Profile';
import PhonicsHome from './screens/English/PhonicsHome';
import PhonicsVideo from './screens/English/PhonicsVideo';
import PhonicsVideoList from './screens/English/PhonicsVideoList';
import MathLessons from './screens/Math/MathLessons';
import Numbers from './screens/Math/Numbers';
import EnglishQuiz from './screens/English/EnglishQuiz';
import AlphabetGame from './screens/English/Alphabets/AlphabetGame';
import IslamicHome from './screens/Islamic/IslamicHome';
import EnglishLesson from './screens/English/Alphabets/EnglishLesson';
import MathLesson from './screens/Math/MathModule/MathLesson';
import AlphabetLesson from './screens/English/AlphabetModule/AlphabetLesson';
import Workbook from './screens/Workbook/Workbook';
import ParentComponent from './screens/Workbook/ParentComponent';
import AlphabetMatching from './screens/English/AlphabetModule/AlphabetMatching';
import Test from './Test';
import ShareMe from './components/Share';
import Shape from './screens/English/AlphabetModule/Shape';
import Animals from './screens/English/AlphabetModule/Animals';
import ShapeHome from './screens/English/AlphabetModule/ShapeHome';
import Working from './screens/Workbook/WorkbookScreen';
import AnimalDetails from './screens/English/AlphabetModule/AnimalDetails';
import {setupPlayer} from './setupPlayer';
import TrackPlayer from 'react-native-track-player';
import NumberLesson from './screens/Math/NumberLesson';
import ForgetPage from './screens/Authentication/ForgetPage';
import FlashMessage from 'react-native-flash-message';
// import CardComponent from './components/CardComponent';

const Stack = createNativeStackNavigator();
type RootStackParamList = {
  Trace: {
    letter: string;
    progress: number;
    setProgress: (progress: number) => void;
  };
  // other screens
};
const App = () => {
  let letter: string;
  const [progress, setProgress] = React.useState(0);
  useEffect(() => {
    setupPlayer();

    return () => {
      TrackPlayer.reset();
    };
  }, []);
  return (
    <AuthProvider>
      <NavigationContainer ref={(navigator: any) => setNavigator(navigator)}>
        <StatusBar hidden={true} />
        <Stack.Navigator
          initialRouteName="Checker"
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="AlphabetGame"
            component={AlphabetGame}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="NumberLesson"
            component={NumberLesson}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="Test"
            component={Test}
            options={{orientation: 'portrait'}}
          />
          <Stack.Screen
            name="AnimalDetails"
            component={AnimalDetails}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="Working"
            component={Working}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="ShareMe"
            component={ShareMe}
            options={{orientation: 'portrait'}}
          />
          <Stack.Screen
            name="Forget"
            component={ForgetPage}
            options={{orientation: 'portrait'}}
          />
          <Stack.Screen
            name="ShapeHome"
            component={ShapeHome}
            options={{orientation: 'landscape'}}
          />

          <Stack.Screen
            name="Checker"
            component={Checker}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="Tracing"
            component={Tracing}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{orientation: 'portrait'}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{orientation: 'portrait'}}
          />
          <Stack.Screen
            name="KidProfile"
            component={KidProfileScreen}
            options={{orientation: 'portrait'}}
          />
          <Stack.Screen
            name="AlphabetLesson"
            component={AlphabetLesson}
            options={{orientation: 'landscape'}}
          />
          {/* <Stack.Screen
            name="CardComponent"
            component={CardComponent}
            options={{ orientation: 'landscape' }}
          /> */}
          <Stack.Screen
            name="Main"
            component={MainMenu}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="English"
            component={EnglishHome}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="EnglishQuiz"
            component={EnglishQuiz}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="EnglishLessons"
            component={EnglishLessons}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="MathLessons"
            component={MathLessons}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="Math"
            component={MathHome}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="Islamic"
            component={IslamicHome}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="Workbook"
            component={WorkbookHome}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="EnglishLesson"
            component={EnglishLesson}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="MathLesson"
            component={MathLesson}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="Vocabulary"
            component={Vocabulary}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="Alphabets"
            component={Alphabets}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="Numbers"
            component={Numbers}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="Games"
            component={YouTubePlayer}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen name="Trace" options={{orientation: 'landscape'}}>
            {props => (
              <LetterTracing
                {...props}
                letter={letter}
                progress={progress}
                setProgress={setProgress}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="Phonics"
            component={Phonics}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="Shape"
            component={Shape}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="Animals"
            component={Animals}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="Parent"
            component={ParentComponent}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="PhonicsLessons"
            component={PhonicsLessons}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="PhonicsHome"
            component={PhonicsHome}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="PhonicsVideo"
            component={PhonicsVideo}
            options={{orientation: 'landscape'}}
          />
          <Stack.Screen
            name="PhonicsVideoList"
            component={PhonicsVideoList}
            options={{orientation: 'landscape'}}
          />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
